const express = require('express');
const { default: mongoose } = require('mongoose');
const app = require('./src/app');

const xlsx = require('xlsx');
const dataexcel = xlsx.readFile('./src/configs/data.xlsx');

const sheet = dataexcel.Sheets[dataexcel.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet);
console.log(rows);
