package com.jasper.prudibel.list

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.jasper.prudibel.R
import com.jasper.prudibel.model.Message

class MessagesListAdapter(private val messages: List<Message>):
    RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    enum class ViewType(val type: Int) { MESSAGE_LEFT(0), MESSAGE_RIGHT(1), LOADING(2) }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return when(viewType) {
            ViewType.MESSAGE_LEFT.type -> {
                val view = LayoutInflater.from(parent.context).inflate(R.layout.messages_list_left_item, parent, false)
                MessageViewHolder(view)
            }
            ViewType.MESSAGE_RIGHT.type -> {
                val view = LayoutInflater.from(parent.context).inflate(R.layout.messages_list_right_item, parent, false)
                MessageViewHolder(view)
            }
            else -> {
                val view = LayoutInflater.from(parent.context).inflate(R.layout.messages_list_right_item, parent, false)
                MessageViewHolder(view)
            }
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        (holder as MessageViewHolder).textView.text = messages[position].content
    }

    override fun getItemViewType(position: Int): Int {
        val item = messages[position]
        return when (item.sender!!) {
            Message.SenderType.BOT -> ViewType.MESSAGE_LEFT.type
            Message.SenderType.USER -> ViewType.MESSAGE_RIGHT.type
        }
    }

    override fun getItemCount() = messages.size

}
