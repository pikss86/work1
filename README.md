необходимо сделать небольшой production-ready web server:

endpoint 1:
https://docs.skinport.com/#items
на выходе массив объектов, где будут дополнительно указаны две минимальные цены на предмет (одна цена — tradable, другая — нет)

endpoint 2:
пополнение баланса пользователя через демоверсию платежной системы
postgres, без ORM, 2 таблицы: users с полем balance, payments

выставить счет: POST https://demo-paygate.steaminventoryhelper.com/invoice
  body пустой
  ответ будет: { success, id }
  
```bash
curl -X POST https://demo-paygate.steaminventoryhelper.com/invoice
```

через 5 секунд придет POST запрос на /callback по ip адресу, с которого был выставлен счет
  id: string
  status: 'paid' | 'refused'
  amount: number

если callback необходимо получать на сторонний ip, то при выставлении счета нужно добавить в body ip
