package com.jasper.prudibel.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.jasper.prudibel.R
import com.jasper.prudibel.view_model.UserViewModel
import kotlinx.coroutines.*

class SplashFragment : Fragment() {

    private val userViewModel: UserViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? = inflater.inflate(R.layout.fragment_splash, container, false)

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        CoroutineScope(Dispatchers.Default).launch {
            delay(3_000L)
            launch(Dispatchers.Main) {
                userViewModel.user.observe(viewLifecycleOwner) {
                    if (it != null) {
                        findNavController().navigate(R.id.action_splashFragment_to_messagesFragment)
                    } else {
                        findNavController().navigate(R.id.action_splashFragment_to_authFragment)
                    }
                }
            }
        }
    }
}
