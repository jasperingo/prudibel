package com.jasper.prudibel.view_model

import android.app.Application
import android.util.Patterns
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException
import com.jasper.prudibel.R
import com.jasper.prudibel.repository.UsersRepository
import com.jasper.prudibel.use_case.CheckNetworkStateUseCase

class AuthViewModel(application: Application): AndroidViewModel(application) {

    val success: MutableLiveData<Boolean> by lazy {
        MutableLiveData(false)
    }

    val error: MutableLiveData<Int?> by lazy {
        MutableLiveData(null)
    }

    val loading: MutableLiveData<Boolean> by lazy {
        MutableLiveData(false)
    }

    private val connectionState = CheckNetworkStateUseCase(application.baseContext)

    fun submit(email: String, password: String) {
        error.postValue(null)
        success.postValue(false)

        if (!Patterns.EMAIL_ADDRESS.matcher(email).matches() || password.isEmpty() || password.length < 6) {
            error.postValue(R.string.Email_or_password_is_incorrect)
        } else if (!connectionState.isConnected) {
            error.postValue(R.string.No_internet_connection)
        } else if (loading.value == false) {
            loading.postValue(true)
            submitToRepository(email, password)
        }
    }

    private fun submitToRepository(email: String, password: String) {
        UsersRepository.auth(email, password,
            {
                success.postValue(true)
                loading.postValue(false)
            }, {
                loading.postValue(false)
                if (it is FirebaseAuthInvalidCredentialsException) {
                    error.postValue(R.string.Email_or_password_is_incorrect)
                } else {
                    error.postValue(R.string.An_error_occurred)
                }
            }
        )
    }
}
