import { Routes } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';

export const routes: Routes = [
    {path: '', redirectTo:'home', pathMatch:'full'},
    {path:'home', component: ChatbotComponent}
];
