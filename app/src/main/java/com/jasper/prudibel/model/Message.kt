package com.jasper.prudibel.model

data class Message(
    val content: String,
    val sender: SenderType
) {
    enum class SenderType { USER, BOT }
}
