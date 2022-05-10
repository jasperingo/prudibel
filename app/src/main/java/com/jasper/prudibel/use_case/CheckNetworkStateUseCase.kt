package com.jasper.prudibel.use_case

import android.content.Context
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkRequest

class CheckNetworkStateUseCase(context: Context) {

    var isConnected = false

    private val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

    init {
        val builder = NetworkRequest.Builder()

        val networkRequest = builder.build()
        connectivityManager.registerNetworkCallback(networkRequest,
            object : ConnectivityManager.NetworkCallback() {
                override fun onAvailable(network: Network) {
                    super.onAvailable(network)
                    isConnected = true
                }

                override fun onLost(network: Network) {
                    super.onLost(network)
                    isConnected = false
                }
            })
    }
}
