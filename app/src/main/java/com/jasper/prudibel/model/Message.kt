package com.jasper.prudibel.model

data class Message(
    val content: String? = null,
    val sender: SenderType? = null
) {
    enum class SenderType { USER, BOT }
}
