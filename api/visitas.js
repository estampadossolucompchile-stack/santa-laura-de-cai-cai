module.exports = async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST') return res.status(405).end();
  const origin=req.headers.origin;
  if(origin!=='https://santa-laura-de-cai-cai.vercel.app')return res.status(403).end();
  const page=typeof req.body?.pagina==='string'?req.body.pagina:'inicio';
  const country=String(req.headers['x-vercel-ip-country']||'Sin ubicación');
  const region=String(req.headers['x-vercel-ip-country-region']||'');
  const zone=[country,region].filter(Boolean).join(' / ').slice(0,120);
  try{
    const response=await fetch('https://lvrmytcylrytclqgrdrv.supabase.co/rest/v1/rpc/sl_registrar_visita',{method:'POST',headers:{apikey:'sb_publishable__yS8gjWj5tTn-WJiVmYSAQ_bJYDyOqn','Content-Type':'application/json'},body:JSON.stringify({p_pagina:page,p_zona:zone})});
    res.status(response.ok?204:502).end();
  }catch{res.status(502).end();}
};