package com.jasper.prudibel.fragment

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.google.android.material.button.MaterialButton
import com.google.android.material.textfield.TextInputLayout
import com.jasper.prudibel.R
import com.jasper.prudibel.view_model.RegisterViewModel

class RegisterFragment : Fragment() {

    private val loadingDialogFragment = LoadingDialogFragment()

    private val viewModel: RegisterViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_register, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        view.findViewById<Button>(R.id.auth_nav_button).setOnClickListener {
            findNavController().navigateUp()
        }

        val nameInput = view.findViewById<TextInputLayout>(R.id.full_name_input)

        val emailInput = view.findViewById<TextInputLayout>(R.id.email_input)

        val passwordInput = view.findViewById<TextInputLayout>(R.id.password_input)

        view.findViewById<MaterialButton>(R.id.submit_button).setOnClickListener {
            viewModel.submit(
                nameInput.editText!!.text.toString(),
                emailInput.editText!!.text.toString(),
                passwordInput.editText!!.text.toString()
            )
        }

        viewModel.nameInputError.observe(viewLifecycleOwner) { setInputError(it, nameInput) }

        viewModel.emailInputError.observe(viewLifecycleOwner) { setInputError(it, emailInput) }

        viewModel.passwordInputError.observe(viewLifecycleOwner) { setInputError(it, passwordInput) }

        viewModel.loading.observe(viewLifecycleOwner, ::setLoadingView)

        viewModel.success.observe(viewLifecycleOwner) {
            if (it)  {
                Toast.makeText(requireContext(), R.string.Registered_successfully, Toast.LENGTH_SHORT).show()
                findNavController().navigate(R.id.action_registerFragment_to_messagesFragment)
            }
        }

        viewModel.error.observe(viewLifecycleOwner) {
            if (it != null) Toast.makeText(requireContext(), it, Toast.LENGTH_SHORT).show()
        }
    }

    private fun setInputError(error: Int?, input: TextInputLayout) {
        input.errorIconDrawable = null
        input.error = if (error != null) getString(error) else null
    }

    private fun setLoadingView(value: Boolean) {
        if (value && (loadingDialogFragment.dialog == null || loadingDialogFragment.dialog?.isShowing == false)) {
            loadingDialogFragment.show(requireActivity().supportFragmentManager, "Loading")
        } else if (!value && loadingDialogFragment.dialog?.isShowing == true) {
            loadingDialogFragment.dismiss()
        }
    }
}
