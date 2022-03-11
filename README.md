## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## env 파일 필요

- David 에게 요청

## Docker 이용한 mysql 명령

- Docker 설치 (https://www.docker.com/get-started)
- 아래 명령 실행 하면 mysql 실행 됨

```bash
$ docker run --name mysql-local -p 3306:3306/tcp -e MYSQL_ROOT_PASSWORD=test -d mysql:8
```

- DB 툴 설치 후 로컬로 붙어서 각자 개발 진행

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
