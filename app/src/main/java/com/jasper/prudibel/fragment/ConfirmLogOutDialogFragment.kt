package com.jasper.prudibel.fragment

import android.app.Dialog
import android.os.Bundle
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.DialogFragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.jasper.prudibel.R
import com.jasper.prudibel.view_model.UserViewModel

class ConfirmLogOutDialogFragment: DialogFragment() {

    private val userViewModel: UserViewModel by viewModels()

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        return activity?.let {
            AlertDialog.Builder(it).apply {
                setTitle(R.string.Confirm_log_out)
                setMessage(R.string._confirm_log_out)
                setPositiveButton(R.string.Proceed) { _, _ ->
                    userViewModel.logOut()
                    findNavController().navigate(R.id.action_confirmLogOutDialogFragment_to_authFragment)
                }
                setNegativeButton(R.string.Cancel) { _, _ -> }
            } .create()
        } ?: throw IllegalStateException("Activity cannot be null")
    }
}
