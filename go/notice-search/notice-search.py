#!/usr/bin/python3
# -*- coding: UTF-8 -*-  

import json

import StockInfoGet


def noticeSearch(reqJson):
    req = json.loads(reqJson)
    company = req["Company"]
    #key = req["Key"]
    #ban = req["Ban"]

    for stockName in company:
        print(stockName)
        si = StockInfoGet.StockInfoGet(stockName)
        orgId, code, name = si.getInfo()

        if(orgId == None):
            print("注意： 没有检索到" + stockName + "的信息")
            continue

        if(stockName != name):
            print("注意： 输入名称为" + stockName + "，检索名称为" + name)

        print(stockName, orgId, code, name)

    return "return to go"


def main():
    reqJson = "{\"Company\":[\"云南白药\",\"南宁糖业\"],\"Key\":[\"key1\",\"key2\"],\"Ban\":[\"ban1\",\"ban2\"]}"
    noticeSearch(reqJson)


if __name__ == "__main__":
    main()
