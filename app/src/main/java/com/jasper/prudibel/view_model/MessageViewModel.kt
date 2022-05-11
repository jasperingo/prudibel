package com.jasper.prudibel.view_model

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.firestore.ktx.toObject
import com.jasper.prudibel.model.Message
import com.jasper.prudibel.repository.MessagesRepository
import com.jasper.prudibel.repository.UsersRepository

class MessageViewModel(application: Application): AndroidViewModel(application) {

    private val user: MutableLiveData<FirebaseUser?> by lazy {
        MutableLiveData(UsersRepository.readOne())
    }

    val messages: MutableLiveData<MutableList<Message>> by lazy {
        fetchMessages()
        MutableLiveData(mutableListOf())
    }

    fun addMessage(message: Message) {
        val list = messages.value!!
        list.add(0, message)
        messages.postValue(list)
        MessagesRepository.create(user.value!!.uid, message)
    }

    private fun fetchMessages() {
        MessagesRepository.read(user.value!!.uid) { snapshots, e ->
            if (e != null) {
                return@read
            }

            for (doc in snapshots!!) {
                val list = messages.value!!
                list.add(doc.toObject())
                messages.postValue(list)
            }
        }
    }

}
