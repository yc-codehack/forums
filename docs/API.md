# API Reference for the Project

## Domains

    - LocalHost: http://localhost/5000/
    - Testing Server:
    -Production Server:

## Authentication Token

    Authorization: Token value in string format

## Endpoints

### AUTH

    1. Signup

        {{domain}}/auth/signup

        - POST
        ```
            {
                "email":"test2@forum.com",
                "password":"password",
                "firstName":"Test",
                "lastName":"Forum"

            }

        ```

    2. Signin

        {{domain}}/auth/signin

        - POST
        ```
            {
                "email":"{{email}}",
                "password":"{{password}}"
            }
        ```

### Questions

    1. Create Question (Auth)

        {{domain}}/question/new

        - POST
        ```
            {
                "title":"What are good questions to ask?",

                "description":"MongoDB is a non-relational database (often known as No-SQL). The term No-SQL is very popular but it contrasts to the fact that SQL has nothing to do with Relational Databases, (Tabular DB) other than the fact that it is just a querying language. They are totally different thing so I think its bit weird that rather than using Non-Relational DB they use No-SQL.",

                "category": "Technology",

                "subcategory": "Databases"

            }
        ```

### Answers

        1. Create Answer (Auth)

            {{domain}}/answer/new

            - POST

            ```
                {
                    "quesId": "60b1c36b9be8db6e8c8397a5",
                    "description": "This is an amazing answer to evry thing in the world"
                }
            ```

### Question Info List

    1. Recent (For main page without Auth)

        {{domain}}/question/list?filter=recent

        - GET

            Response
                ```
                    [
                        {
                            "_id": "60b1c36b9be8db6e8c8397a5",
                            "title": "What are good questions to ask?",
                            "description": "MongoDB is a non-relational database",
                            "createdAt": "2 D",
                            "likeCount": 0,
                            "dislikeCount": 0,
                            "creatorName": "Static"
                        },
                        {
                            "_id": "60b1bfbe5bd49465934d2321",
                            "title": "What are good questions to ask?",
                            "description": "MongoDB is a non-relational ",
                            "createdAt": "2 D",
                            "likeCount": 0,
                            "dislikeCount": 0,
                            "creatorName": "Static"
                        }
                    ]
                ```

    2. Category Wise (Without Auth)

        {{domain}}/question/list?filter=category&filterInfo=Technology&sort=likeCount&sortInfo=-1


        - GET

            **PARAMS**
                1. filter = {category, creator }
                2. filterInfo = { subcategory, creatorId }
                3. sort = { likeCount, dislikeCount, createdAt }
                4. sortInfo = { 1:low, -1:high  }

            Response
            ```
                [
                    {
                        "_id": "60ae7dcb3ddb646e530b6174",
                        "title": "What is MongoDB?1",
                        "description": "on-Relational DB they use No-SQL.",
                        "createdAt": "4 D",
                        "likeCount": 40,
                        "dislikeCount": 0,
                        "creatorName": "Static"
                    },
                    {
                        "_id": "60ae59b1543589465cabfc18",
                        "title": "What is MongoDB?",
                        "description": "MongoDB is a non-relational ",
                        "createdAt": "4 D",
                        "likeCount": 10,
                        "dislikeCount": 0,
                        "creatorName": "Static"
                    }
                ]
            ```

    3. Search (without Auth)

        It supports fuzzy search

        {{domain}}/question/search?searchItem=db


        - GET

            **PARAM**
                1. searchItem = {string that need to be searched}

            Response

            ```
                [
                    {
                        "_id": "60ae7dcb3ddb646e530b6174",
                        "title": "What is MongoDB?1",
                        "description": "MongoDB is a non-relational ",
                        "createdAt": "4 D",
                        "likeCount": 40,
                        "dislikeCount": 0,
                        "creatorName": "Static"
                    },
                    {
                        "_id": "60ae7452f6aab05d8c5ba8a2",
                        "title": "What is MongoDB?1",
                        "description": "MongoDB is a non-relational ",
                        "createdAt": "4 D",
                        "likeCount": 20,
                        "dislikeCount": 0,
                        "creatorName": "Static"
                    }
                ]
            ```

### Question & Answer

    1. Question Like ( with AUTH )

        {{domain}}/question/like/

        - POST

            ```
            {
                "type": "question",
                "quesId": "60b1c36b9be8db6e8c8397a5"
            }
            ```

    2. Question Dislike ( with AUTH )

        {{domain}}/question/dislike/

        - POST

            ```
            {
                "type": "ques",
                "quesId": "60b1c36b9be8db6e8c8397a5"
            }
            ```

    3. Answer Like ( with AUTH )

        {{domain}}/question/like/

        - POST

            ```
            {
                "type": "answer",
                "quesId": "60b1c36b9be8db6e8c8397a5",
                "ansId": "60b2620cf9488b31f48c7778"
            }
            ```

    4. Answer Dislike ( with AUTH )

        {{domain}}/question/dislike/

        - POST

            ```
                {
                    "type": "answer",
                    "quesId": "60b1c36b9be8db6e8c8397a5",
                    "ansId": "60b2620cf9488b31f48c7778"
                }
            ```

### Admin

    1. Add Category ( with Auth )

        {{domain}}/admin/category/new/

        - POST

            ```
            {
                "name": "Technology",
                "description": "Technology is great",
                "image": "technology"
            }
            ```
