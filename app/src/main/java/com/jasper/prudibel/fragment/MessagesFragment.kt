package com.jasper.prudibel.fragment

import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.button.MaterialButton
import com.google.android.material.textfield.TextInputLayout
import com.jasper.prudibel.R
import com.jasper.prudibel.list.MessagesListAdapter
import com.jasper.prudibel.model.Message
import com.jasper.prudibel.view_model.MessageViewModel
import com.jasper.prudibel.view_model.UserViewModel

class MessagesFragment : Fragment() {

    private val userViewModel: UserViewModel by viewModels()

    private val messageViewModel: MessageViewModel by viewModels()

    private lateinit var listView: RecyclerView

    private lateinit var sendButton: MaterialButton

    private val textWatcher = object: TextWatcher {
        override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {}

        override fun onTextChanged(text: CharSequence?, p1: Int, p2: Int, p3: Int) {
            sendButton.isEnabled = !text.isNullOrBlank()
        }

        override fun afterTextChanged(p0: Editable?) {}
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? = inflater.inflate(R.layout.fragment_messages, container, false)

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        listView = view.findViewById(R.id.messages_list)
        listView.layoutManager = LinearLayoutManager(requireContext()).apply { reverseLayout = true }
        listView.adapter = MessagesListAdapter(messageViewModel.messages.value!!)

        messageViewModel.messages.observe(viewLifecycleOwner) { onMessageAdded() }

        val messageInput = view.findViewById<TextInputLayout>(R.id.message_input)

        messageInput.editText?.addTextChangedListener(textWatcher)

        sendButton = view.findViewById(R.id.send_button)

        sendButton.setOnClickListener {
            messageViewModel.addMessage(Message(messageInput.editText!!.text.toString(), Message.SenderType.USER))
            onMessageAdded()

            messageViewModel.addMessage(Message(userViewModel.user.value!!.displayName!!, Message.SenderType.BOT))
            onMessageAdded()
        }
    }

    private fun onMessageAdded() {
        (listView.adapter as MessagesListAdapter).notifyItemInserted(0)
        listView.scrollToPosition(0)
    }
}
