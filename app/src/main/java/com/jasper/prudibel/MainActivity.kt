package com.jasper.prudibel

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.appcompat.widget.Toolbar
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController

class MainActivity : AppCompatActivity() {

    private lateinit var toolBar : Toolbar

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        toolBar = findViewById(R.id.main_toolbar)

        setSupportActionBar(toolBar)
    }

    override fun onStart() {
        super.onStart()
        val navController = findNavController(R.id.nav_host)

        navController.addOnDestinationChangedListener { _, destination, _ ->
            when(destination.id) {
                R.id.splashFragment -> toolBar.visibility = View.GONE
                else -> toolBar.visibility = View.VISIBLE
            }
        }

        toolBar.setupWithNavController(navController, AppBarConfiguration(navController.graph))
    }
}
