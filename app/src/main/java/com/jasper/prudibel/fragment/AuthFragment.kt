package com.jasper.prudibel.fragment

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.Toast
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.google.android.material.button.MaterialButton
import com.google.android.material.textfield.TextInputLayout
import com.jasper.prudibel.R
import com.jasper.prudibel.view_model.AuthViewModel

class AuthFragment : HaveLoadingDialogFragment() {

    private val viewModel: AuthViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? = inflater.inflate(R.layout.fragment_auth, container, false)

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val navController = findNavController()

        view.findViewById<Button>(R.id.auth_nav_button).setOnClickListener {
            navController.navigate(R.id.action_authFragment_to_registerFragment)
        }

        val emailInput = view.findViewById<TextInputLayout>(R.id.email_input)

        val passwordInput = view.findViewById<TextInputLayout>(R.id.password_input)

        view.findViewById<MaterialButton>(R.id.submit_button).setOnClickListener {
            viewModel.submit(
                emailInput.editText!!.text.toString(),
                passwordInput.editText!!.text.toString()
            )
        }

        viewModel.loading.observe(viewLifecycleOwner, ::setLoadingView)

        viewModel.success.observe(viewLifecycleOwner) {
            if (it)  {
                Toast.makeText(requireContext(), R.string.Logged_in_successfully, Toast.LENGTH_SHORT).show()
                navController.navigate(R.id.action_authFragment_to_messagesFragment)
            }
        }

        viewModel.error.observe(viewLifecycleOwner) {
            if (it != null) Toast.makeText(requireContext(), it, Toast.LENGTH_SHORT).show()
        }
    }
}
