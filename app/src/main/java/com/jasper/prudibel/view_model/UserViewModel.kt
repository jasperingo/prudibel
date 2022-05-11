package com.jasper.prudibel.view_model

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.google.firebase.auth.FirebaseUser
import com.jasper.prudibel.repository.UsersRepository

class UserViewModel: ViewModel() {

    val user: MutableLiveData<FirebaseUser?> by lazy {
        MutableLiveData(UsersRepository.readOne())
    }

    fun logOut() = UsersRepository.unAuth()

}
