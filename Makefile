# Makefile para plantilla fullstack multiservicio
# Simplifica los comandos comunes de Docker Compose

# Variables de configuración
COMPOSE_FILE = docker-compose.yml
PROJECT_NAME = plantilla-fullstack

# Colores para output
GREEN = \033[0;32m
YELLOW = \033[1;33m
RED = \033[0;31m
NC = \033[0m # No Color

.PHONY: help bootstrap dev stop clean logs shell-frontend shell-backend

# Comando por defecto - muestra ayuda
help:
	@echo "$(GREEN)📦 Plantilla Fullstack - Comandos disponibles:$(NC)"
	@echo ""
	@echo "$(YELLOW)🚀 Comandos principales:$(NC)"
	@echo "  make bootstrap    - Preparar proyecto (instalar deps y construir imágenes)"
	@echo "  make dev         - Levantar servicios en modo desarrollo"
	@echo "  make stop        - Parar todos los servicios"
	@echo "  make clean       - Limpiar contenedores, imágenes y volúmenes"
	@echo ""
	@echo "$(YELLOW)🔍 Comandos de debug:$(NC)"
	@echo "  make logs        - Ver logs de todos los servicios"
	@echo "  make shell-frontend  - Acceder al shell del contenedor frontend"
	@echo "  make shell-backend   - Acceder al shell del contenedor backend"
	@echo ""
	@echo "$(YELLOW)📋 URLs del proyecto:$(NC)"
	@echo "  Frontend: http://localhost:5173"
	@echo "  Backend:  http://localhost:3000"

# Prepara todo el entorno de desarrollo
bootstrap:
	@echo "$(GREEN)🔧 Preparando entorno de desarrollo...$(NC)"
	@echo "$(YELLOW)📦 Construyendo imágenes Docker...$(NC)"
	docker compose -f $(COMPOSE_FILE) build --no-cache
	@echo "$(YELLOW)📥 Instalando dependencias...$(NC)"
	docker compose -f $(COMPOSE_FILE) run --rm frontend pnpm install
	docker compose -f $(COMPOSE_FILE) run --rm backend pnpm install
	@echo "$(GREEN)✅ ¡Entorno preparado! Ejecuta 'make dev' para iniciar$(NC)"

# Levanta los servicios en modo desarrollo
dev:
	@echo "$(GREEN)🚀 Iniciando servicios en modo desarrollo...$(NC)"
	@echo "$(YELLOW)Frontend estará disponible en: http://localhost:5173$(NC)"
	@echo "$(YELLOW)Backend estará disponible en: http://localhost:3000$(NC)"
	@echo "$(YELLOW)Presiona Ctrl+C para detener los servicios$(NC)"
	docker compose -f $(COMPOSE_FILE) up

# Levanta los servicios en background
dev-detached:
	@echo "$(GREEN)🚀 Iniciando servicios en segundo plano...$(NC)"
	docker compose -f $(COMPOSE_FILE) up -d
	@echo "$(GREEN)✅ Servicios iniciados. Usa 'make logs' para ver los logs$(NC)"
	@echo "$(YELLOW)Frontend: http://localhost:5173$(NC)"
	@echo "$(YELLOW)Backend: http://localhost:3000$(NC)"

# Para todos los servicios
stop:
	@echo "$(YELLOW)⏹️  Deteniendo servicios...$(NC)"
	docker compose -f $(COMPOSE_FILE) down
	@echo "$(GREEN)✅ Servicios detenidos$(NC)"

# Limpia completamente el entorno
clean:
	@echo "$(RED)🧹 Limpiando entorno completo...$(NC)"
	@echo "$(YELLOW)Esto eliminará contenedores, imágenes y volúmenes del proyecto$(NC)"
	@read -p "¿Estás seguro? (y/N): " confirm; \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		docker compose -f $(COMPOSE_FILE) down -v --rmi all --remove-orphans; \
		docker system prune -f; \
		echo "$(GREEN)✅ Limpieza completada$(NC)"; \
	else \
		echo "$(YELLOW)❌ Operación cancelada$(NC)"; \
	fi

# Muestra logs de todos los servicios
logs:
	@echo "$(GREEN)📋 Mostrando logs de todos los servicios...$(NC)"
	@echo "$(YELLOW)Presiona Ctrl+C para salir$(NC)"
	docker compose -f $(COMPOSE_FILE) logs -f

# Logs de un servicio específico
logs-frontend:
	@echo "$(GREEN)📋 Logs del frontend...$(NC)"
	docker compose -f $(COMPOSE_FILE) logs -f frontend

logs-backend:
	@echo "$(GREEN)📋 Logs del backend...$(NC)"
	docker compose -f $(COMPOSE_FILE) logs -f backend

# Accede al shell del contenedor frontend
shell-frontend:
	@echo "$(GREEN)🐚 Accediendo al shell del frontend...$(NC)"
	docker compose -f $(COMPOSE_FILE) exec frontend sh

# Accede al shell del contenedor backend
shell-backend:
	@echo "$(GREEN)🐚 Accediendo al shell del backend...$(NC)"
	docker compose -f $(COMPOSE_FILE) exec backend sh

# Reinicia un servicio específico
restart-frontend:
	@echo "$(YELLOW)🔄 Reiniciando frontend...$(NC)"
	docker compose -f $(COMPOSE_FILE) restart frontend

restart-backend:
	@echo "$(YELLOW)🔄 Reiniciando backend...$(NC)"
	docker compose -f $(COMPOSE_FILE) restart backend

# Muestra el estado de los servicios
status:
	@echo "$(GREEN)📊 Estado de los servicios:$(NC)"
	docker compose -f $(COMPOSE_FILE) ps

# Instala dependencias en un servicio específico
install-frontend:
	@echo "$(GREEN)📦 Instalando dependencias del frontend...$(NC)"
	docker compose -f $(COMPOSE_FILE) exec frontend pnpm install

install-backend:
	@echo "$(GREEN)📦 Instalando dependencias del backend...$(NC)"
	docker compose -f $(COMPOSE_FILE) exec backend pnpm install