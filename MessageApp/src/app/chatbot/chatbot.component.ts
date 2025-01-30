import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  imports: [FormsModule, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  @ViewChild('chatContainer', { static: false }) chatContainer!: ElementRef;
  userInput: string = '';
  isLoading: boolean = false;

  constructor(private renderer: Renderer2) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Append user message
    this.appendMessage(this.userInput, 'user');
    const userMessage = this.userInput;
    this.userInput = '';

    this.isLoading = true;

    // Simulate bot response after 2 seconds
    setTimeout(() => {
      this.appendMessage(this.getBotResponse(userMessage), 'bot');
      this.isLoading = false;
    }, 2000);
  }

  getBotResponse(input: string): string {
    const responses: { [key: string]: string } = {
      hello: "Hi there! How can I help you?",
      bye: "Goodbye! Have a great day!",
      help: "Sure! I'm here to help you."
    };
    return responses[input.toLowerCase()] || "I'm not sure how to respond to that.";
  }

  appendMessage(text: string, sender: 'user' | 'bot') {
    if (!this.chatContainer) return;

    // Create message wrapper div
    const messageWrapper = this.renderer.createElement('div');
    this.renderer.addClass(messageWrapper, sender === 'user' ? 'chat-message-user' : 'chat-message-bot');
    this.renderer.addClass(messageWrapper, 'mb-2');

    // Create inner message div
    const messageDiv = this.renderer.createElement('div');
    this.renderer.addClass(messageDiv, 'chat-message');

    // Create sender label div
    const senderDiv = this.renderer.createElement('div');
    this.renderer.addClass(senderDiv, sender);
    const senderText = this.renderer.createText(sender === 'user' ? 'KT' : 'Bot');
    this.renderer.appendChild(senderDiv, senderText);

    // Create message text div
    const textDiv = this.renderer.createElement('div');
    const textNode = this.renderer.createText(text);
    this.renderer.appendChild(textDiv, textNode);

    // Assemble message structure
    this.renderer.appendChild(messageDiv, senderDiv);
    this.renderer.appendChild(messageDiv, textDiv);
    this.renderer.appendChild(messageWrapper, messageDiv);

    // Append message to chat container
    this.renderer.appendChild(this.chatContainer.nativeElement, messageWrapper);

    // Scroll to latest message
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }
}
