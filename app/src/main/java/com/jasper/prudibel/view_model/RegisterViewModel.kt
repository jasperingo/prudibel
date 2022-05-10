package com.jasper.prudibel.view_model

import android.app.Application
import android.util.Patterns
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import com.google.firebase.auth.FirebaseAuthUserCollisionException
import com.jasper.prudibel.R
import com.jasper.prudibel.repository.UsersRepository
import com.jasper.prudibel.use_case.CheckNetworkStateUseCase

class RegisterViewModel(application: Application): AndroidViewModel(application) {

    val success: MutableLiveData<Boolean> by lazy {
        MutableLiveData(false)
    }

    val error: MutableLiveData<Int?> by lazy {
        MutableLiveData(null)
    }

    val loading: MutableLiveData<Boolean> by lazy {
        MutableLiveData(false)
    }

    val nameInputError: MutableLiveData<Int?> by lazy {
        MutableLiveData(null)
    }

    val emailInputError: MutableLiveData<Int?> by lazy {
        MutableLiveData(null)
    }

    val passwordInputError: MutableLiveData<Int?> by lazy {
        MutableLiveData(null)
    }

    private val connectionState = CheckNetworkStateUseCase(application.baseContext)

    fun submit(name: String, email: String, password: String) {
        var hasError = false

        error.postValue(null)
        success.postValue(false)

        if (name.isBlank()) {
            hasError = true
            nameInputError.postValue(R.string.Enter_your_full_name)
        } else {
            nameInputError.postValue(null)
        }

        if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            hasError = true
            emailInputError.postValue(R.string.Enter_a_valid_email)
        } else {
            emailInputError.postValue(null)
        }

        if (password.isEmpty() || password.length < 6) {
            hasError = true
            passwordInputError.postValue(R.string.Password_is_too_short)
        } else {
            passwordInputError.postValue(null)
        }

        if (!hasError && !connectionState.isConnected) {
            error.postValue(R.string.No_internet_connection)
        } else if (!hasError && loading.value == false) {
            loading.postValue(true)
            submitToRepository(name, email, password)
        }
    }

    private fun submitToRepository(name: String, email: String, password: String) {
        UsersRepository.create(name, email, password,
            {
                success.postValue(true)
                loading.postValue(false)
            }, {
                loading.postValue(false)
                if (it is FirebaseAuthUserCollisionException) {
                    emailInputError.postValue(R.string.Email_already_exists)
                } else {
                    error.postValue(R.string.An_error_occurred)
                }
            }
        )
    }


}
