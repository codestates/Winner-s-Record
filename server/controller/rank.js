import 'express-async-errors';
import * as rankData from '../data/rank.js';

export async function searchRank (req, res) {
  const {event, nickname} = req.query

  if (event) {
    const sport = await rankData.validEvent(event) 
    if(sport) {
      const eventRecord = await rankData.findByEvent(event)
      return res.status(200).send({data: eventRecord})
    } else {
      return res.status(404).send({message: '해당 페이지를 찾을 수 없습니다'})
    }
  }
  else if (nickname) {
    const user = await rankData.validUser(nickname) 
    if(user) {
      const userRecord = await rankData.findByNickname(nickname)
      return res.status(200).send({data: userRecord})
    } else {
      return res.status(404).send({message: '해당 페이지를 찾을 수 없습니다'})
    }
  }
  res.status(404).send({message: '해당 페이지를 찾을 수 없습니다'})
}