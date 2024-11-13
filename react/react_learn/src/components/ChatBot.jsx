import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import  { useContext } from "react"
import Api from "../contexts/request"


const Chatbot=()=>{
    const{SOURCE}=useContext(Api)

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
  
    const handleSend =  async() => {
      if (input.trim()) {
        // Ajouter le message utilisateur
        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);
        console.log(input)
        try {
            // Envoyer le message à l'API FastAPI
            const response = await fetch(`${SOURCE}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: input }),
            });

            const data = await response.json();

            // Ajouter la réponse de l'API au chat
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: data.response, sender: 'bot' }
            ]);
        } catch (error) {
            console.error("Erreur lors de l'envoi du message :", error);
        }
        
        // Réponse du bot (simulée ici)
        // const botMessage = {
        //   sender: 'bot',
        //   text: "Ceci est une réponse automatique. Je suis là pour aider !",
        // };
  
        // Ajouter le message du bot après le message de l'utilisateur
        setMessages([...messages, userMessage]);
        setInput('');
      }
    };
  
    return (
      <Container className="mt-4">
        <Row>
          <Col md={{ span: 100, offset: 3 }}>
            <h3 className="text-center mb-4">Audrey 3.0.0</h3>
            <Card>
              <Card.Body style={{ height: '400px', overflowY: 'scroll' }}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`d-flex ${
                      message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'
                    } mb-2`}
                  >
                    <div
                      className={`p-2 rounded ${
                        message.sender === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'
                      }`}
                      style={{ maxWidth: '100%' }}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </Card.Body>
              <Card.Footer>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                >
                  <Form.Group className="d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Écrire un message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleSend} className="ms-2">
                      Envoyer
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }


export default Chatbot