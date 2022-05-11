package com.jasper.prudibel.repository

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.auth.ktx.userProfileChangeRequest
import com.google.firebase.ktx.Firebase
import java.lang.Exception

object UsersRepository {

    private val auth: FirebaseAuth by lazy {
        Firebase.auth
    }

    fun create(name: String, email: String, password: String, onSuccess: () -> Unit, onFailure: (Exception) -> Unit) {
        auth.createUserWithEmailAndPassword(email, password)
            .addOnSuccessListener {
                it.user
                    ?.updateProfile(userProfileChangeRequest { displayName = name })
                    ?.addOnSuccessListener { onSuccess() }
                    ?.addOnFailureListener(onFailure)
            }.addOnFailureListener(onFailure)
    }

    fun auth(email: String, password: String, onSuccess: () -> Unit, onFailure: (Exception) -> Unit) {
        auth.signInWithEmailAndPassword(email, password)
            .addOnSuccessListener { onSuccess() }
            .addOnFailureListener(onFailure)
    }

    fun readOne() = auth.currentUser

}
