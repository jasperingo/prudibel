package com.jasper.prudibel.list

import android.view.View
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.jasper.prudibel.R

class MessageViewHolder(view: View): RecyclerView.ViewHolder(view) {
    val textView: TextView = view.findViewById(R.id.message_content)
}