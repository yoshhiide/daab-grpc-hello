# gRPCをhubotベースのdaabで使用するサンプルコード

2つボット間でgRPCを利用して送信メッセージを渡すサンプルコード
---

## サンプル実行方法
clientボットとserverボットを実行する  

0. それぞれのボットで`daab login`

1. 2つのコンソールを開いて下記の実行

```
cd bot_server && daab run -d
cd bot_client && daab run -d

```

2. serverボットにdirectのペアトークで`cache`とメッセージ送信

3. clientボットにdirectのペアトークで`ping`とメッセージ送信