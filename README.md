# Desafio Cellar Vinhos 🍷

Este é um projeto [Expo](https://expo.dev) criado com [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Como começar

1. Instale as dependências

   ```bash
   npm install
   ```
   ou

   ```bash
   yarn install
   ```

2. Rode o app

   > **Observação:** Para rodar o app, é necessário ter um dispositivo Android conectado ao computador com o modo desenvolvedor ativado ou um emulador Android em execução.

   ```bash
   npx android
   ```

---

## Tecnologias Utilizadas

- **React Native**
- **Expo**
- **Firebase** (Auth, Firestore e FCM)
- **Nativewind**
- **Jest**
- **Yup**
- **Context API**

---

## Decisões Técnicas

###  Expo
O Expo foi utilizado devido à sua capacidade de acelerar o desenvolvimento. No entanto, não é utilizado no momento da build (`npx expo start`), pois o Expo Go não suporta integrações com o Firebase, já que este utiliza módulos nativos. A build com `npx android` é mais demorada, mas permite utilizar todos os recursos do Firebase.

###  Nativewind
Para estilização, optei pelo Nativewind, pois segue a mesma lógica do desenvolvimento web, sendo mais compatível com o conhecimento de vários desenvolvedores e facilitando a integração entre equipes. Outro ponto importante é que o Styled Components foi descontinuado; apesar de ainda ser amplamente utilizado, sua descontinuação pode causar incompatibilidades futuras.

###  Jest
Para testes automatizados, utilizei o Jest, por ser simples e amplamente adotado como ferramenta de testes em projetos JavaScript/TypeScript.

###  Firebase
O Firebase foi utilizado com os seguintes recursos: autenticação por e-mail/senha, registro de usuários, Firestore com operações de criação, leitura e exclusão de informações, além do Messaging (FCM), que pode ser enviado pela plataforma do Firebase e já está implementado no app.

### Github Actions
Para CI/CD, utilizei o Github Actions, implementando até a etapa de testes e build das versões de desenvolvimento. A partir desse ponto, seria possível integrar com as lojas, visto que o app já foi testado.