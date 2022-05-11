package com.jasper.prudibel.repository

import android.util.Log
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.FirebaseFirestoreException
import com.google.firebase.firestore.QuerySnapshot
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.jasper.prudibel.model.Message

const val TAG = "WE ARE ALL CRAZY"

object MessagesRepository {

    private val db: FirebaseFirestore by lazy {
        Firebase.firestore
    }

    fun create(userId: String, message: Message) {
        db.collection(userId)
            .add(message)
            .addOnSuccessListener { Log.d(TAG, "DocumentSnapshot successfully written!") }
            .addOnFailureListener { e -> Log.e(TAG, "Error writing document", e) }
    }

    fun read(userId: String, callBack: (QuerySnapshot?, FirebaseFirestoreException?) -> Unit) {
        db.collection(userId).addSnapshotListener(callBack)
    }

}
