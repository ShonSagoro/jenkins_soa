pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                // Aquí puedes incluir los pasos necesarios para la construcción de tu proyecto
            }
        }
        stage('Test') {
            steps {
                // Aquí puedes incluir los pasos necesarios para las pruebas de tu proyecto
            }
        }
        stage('Deploy to EC2') {
            steps {
                // Aquí puedes incluir los pasos necesarios para el despliegue en tus instancias EC2
                // Por ejemplo, puedes usar SSH para conectarte a tus instancias y ejecutar comandos
                // de Docker para construir y ejecutar contenedores en tus EC2
                script {
                    sshagent(credentials: ['credenciales-ssh']) {
                        sh 'ssh -o StrictHostKeyChecking=no usuario@tu-ec2 "cd /ruta/del/proyecto && git pull && docker build -t nombre-imagen . && docker run -d --name nombre-contenedor -p puerto-local:puerto-contenedor nombre-imagen"'
                    }
                }
            }
        }
    }
}
