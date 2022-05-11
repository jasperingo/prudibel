package com.jasper.prudibel.fragment

import androidx.fragment.app.Fragment

open class HaveLoadingDialogFragment: Fragment() {

    private val loadingDialogFragment = LoadingDialogFragment()

    protected fun setLoadingView(value: Boolean) {
        if (value && (loadingDialogFragment.dialog == null || loadingDialogFragment.dialog?.isShowing == false)) {
            loadingDialogFragment.show(requireActivity().supportFragmentManager, "Loading")
        } else if (!value && loadingDialogFragment.dialog?.isShowing == true) {
            loadingDialogFragment.dismiss()
        }
    }
}