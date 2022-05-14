package com.jasper.prudibel.view_model

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.firestore.FieldValue
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

    val messageAdded: MutableLiveData<Boolean> = MutableLiveData(false)

    val messageLoaded: MutableLiveData<Boolean> = MutableLiveData(false)

    fun addMessage(content: String) {
        MessagesRepository.create(
            user.value!!.uid,
            Message(null, content, Message.SenderType.USER, FieldValue.serverTimestamp())
        )
    }

    private fun fetchMessages() {
        MessagesRepository.read(user.value!!.uid) { snapshots, error ->
            if (error != null) { return@read }

            var added = false
            var loaded = false

            val list = messages.value!!

            for (doc in snapshots!!) {
                val item = doc.toObject<Message>()
                item.id = doc.id
                val existingItem = list.find { it.id == item.id }
                if (existingItem == null) {
                    if (doc.metadata.hasPendingWrites()) {
                        added = true
                        list.add(0, item)
                    } else {
                        loaded = true
                        list.add(item)
                    }
                }
            }

            messages.postValue(list)

            if (added) {
                messageAdded.postValue(true)
            }

            if (loaded) {
                messageLoaded.postValue(true)
            }
        }
    }

    fun afterAdded() = messageAdded.postValue(false)

    fun afterLoaded() = messageLoaded.postValue(false)
}
