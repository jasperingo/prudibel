package com.jasper.prudibel.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.jasper.prudibel.R
import com.jasper.prudibel.list.MessagesListAdapter
import com.jasper.prudibel.model.Message

class MessagesFragment : Fragment() {

    private lateinit var listView: RecyclerView

    private val messages = listOf(Message("Hello"), Message("How are you"), Message("Are you coming today?"))

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_messages, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        listView = view.findViewById(R.id.messages_list)
        listView.layoutManager = LinearLayoutManager(requireContext())
        listView.adapter = MessagesListAdapter(messages)
    }
}
