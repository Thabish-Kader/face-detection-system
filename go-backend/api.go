package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type APIServer struct {
	listenAddr string
}

func NewAPIServer(listenAddr string) *APIServer {
	return &APIServer{
		listenAddr: listenAddr,
	}
}

func (server *APIServer) Run() {
	r := gin.Default()
	r.GET("/login", server.handleLogin)
	log.Println("Server running on: ", server.listenAddr)
	r.Run(server.listenAddr)
}

func (serv *APIServer) handleLogin(c *gin.Context) {
	c.String(http.StatusOK, "Hello, World!")
}
