package com.jasper.prudibel

import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.navigation.NavController
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupWithNavController

class MainActivity : AppCompatActivity() {

    private lateinit var toolBar : Toolbar

    private lateinit var navController: NavController

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        toolBar = findViewById(R.id.main_toolbar)

        setSupportActionBar(toolBar)
    }

    override fun onStart() {
        super.onStart()

        navController = findNavController(R.id.nav_host)

        navController.addOnDestinationChangedListener { _, destination, _ ->
            invalidateOptionsMenu()
            when(destination.id) {
                R.id.splashFragment -> toolBar.visibility = View.GONE
                else -> toolBar.visibility = View.VISIBLE
            }
        }

        toolBar.setupWithNavController(navController, AppBarConfiguration(setOf(R.id.messagesFragment, R.id.authFragment)))
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main_menu, menu)
        return true
    }

    override fun onPrepareOptionsMenu(menu: Menu?): Boolean {
        if (navController.currentDestination?.id != R.id.messagesFragment) {
            menu?.findItem(R.id.log_out)?.isVisible = false
        }
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.log_out -> {
                navController.navigate(R.id.action_messagesFragment_to_confirmLogOutDialogFragment)
                true
            }
            else -> super.onOptionsItemSelected(item)
        }

    }
}
