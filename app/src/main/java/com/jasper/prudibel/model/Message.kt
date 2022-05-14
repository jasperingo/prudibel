package com.jasper.prudibel.model

data class Message(
    var id: String? = null,
    val content: String? = null,
    val sender: SenderType? = null,
    val date: Any? = null
) {
    enum class SenderType { USER, BOT }
}
