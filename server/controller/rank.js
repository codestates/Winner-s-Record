import 'express-async-errors';
import * as rankData from '../data/rank.js';

export async function searchRank (req, res) {
  const {event, nickname} = req.query
  if (event && nickname) {
    const sport = await rankData.validEvent(event) 
    const user = await rankData.validUser(nickname) 
    if(sport && user === 'ok') {
      const eventRecord = await rankData.findAllRank(event)
      return res.status(200).send({data: eventRecord})
    } else if(sport && user.dataValues){
      const nicknameRecord = await rankData.findNicknameRank(event, nickname)
      return res.status(200).send({data: nicknameRecord})
    }
    return res.status(404).send({message: '해당 페이지를 찾을 수 없습니다'})
  }
}