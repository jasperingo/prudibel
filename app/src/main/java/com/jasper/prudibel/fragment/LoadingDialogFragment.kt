package com.jasper.prudibel.fragment

import android.app.Dialog
import android.os.Bundle
import android.view.ViewGroup
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.DialogFragment
import com.jasper.prudibel.R

class LoadingDialogFragment: DialogFragment() {

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        return activity?.let {
            val builder = AlertDialog.Builder(it)
            builder.setView(R.layout.fragment_loading_dialog)
            builder.create()
        } ?: throw IllegalStateException("Activity cannot be null")
    }

    override fun onResume() {
        super.onResume()
        dialog?.setCanceledOnTouchOutside(false)
        val window = dialog?.window ?: return
        val params = window.attributes
        params.width = 500
        params.height = ViewGroup.LayoutParams.WRAP_CONTENT
        window.attributes = params
    }
}
