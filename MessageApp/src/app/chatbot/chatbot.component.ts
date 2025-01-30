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

    // Create and append user message div
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

    // Create new div for message
    const messageDiv = this.renderer.createElement('div');
    this.renderer.addClass(messageDiv, sender);
    const textNode = this.renderer.createText(text);
    
    // Append text to div and div to container
    this.renderer.appendChild(messageDiv, textNode);
    this.renderer.appendChild(this.chatContainer.nativeElement, messageDiv);

    // Scroll to latest message
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }
}
