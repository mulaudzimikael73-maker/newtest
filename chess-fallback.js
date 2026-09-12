/* LizzyOS chess fallback: used only if chess.js CDN is unavailable. */
(()=>{
  if(window.Chess)return;
  const files='abcdefgh';
  const start=[
    ['r','n','b','q','k','b','n','r'],['p','p','p','p','p','p','p','p'],
    [null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],
    ['P','P','P','P','P','P','P','P'],['R','N','B','Q','K','B','N','R']
  ];
  function clone(b){return b.map(r=>r.slice())}
  function parseFen(f){
    const b=Array.from({length:8},()=>Array(8).fill(null));
    const rows=String(f).split(' ')[0].split('/');
    rows.forEach((row,r)=>{let c=0;for(const ch of row){if(/\d/.test(ch))c+=+ch;else b[r][c++]=ch;}});
    return b;
  }
  function makeFen(b,turn){return b.map(row=>{let s='',n=0;for(const p of row){if(!p)n++;else{if(n){s+=n;n=0}s+=p}}if(n)s+=n;return s}).join('/')+' '+turn+' - - 0 1'}
  function color(p){return p&&p===p.toUpperCase()?'w':'b'}
  function pathClear(b,fr,fc,tr,tc){const dr=Math.sign(tr-fr),dc=Math.sign(tc-fc);let r=fr+dr,c=fc+dc;while(r!==tr||c!==tc){if(b[r][c])return false;r+=dr;c+=dc}return true}
  class LiteChess{
    constructor(){this.reset()}
    reset(){this._b=clone(start);this._turn='w';this._history=[];return true}
    load(fen){const parts=String(fen).split(' ');this._b=parseFen(fen);this._turn=parts[1]==='b'?'b':'w';this._history=[];return true}
    board(){return this._b.map(row=>row.map(p=>p?{type:p.toLowerCase(),color:color(p)}:null))}
    get(sq){const c=files.indexOf(sq[0]),r=8-Number(sq[1]);const p=this._b[r]?.[c];return p?{type:p.toLowerCase(),color:color(p)}:null}
    turn(){return this._turn}
    fen(){return makeFen(this._b,this._turn)}
    pgn(){return this._history.join(' ')}
    moves(opts={}){
      const sq=opts.square;if(!sq)return [];
      const fc=files.indexOf(sq[0]),fr=8-Number(sq[1]),p=this._b[fr]?.[fc];if(!p)return [];
      const out=[],pc=color(p),t=p.toLowerCase(), add=(r,c)=>{if(r<0||r>7||c<0||c>7)return false;const q=this._b[r][c];if(q&&color(q)===pc)return false;out.push({from:sq,to:files[c]+(8-r),san:(q?'x':'')+files[c]+(8-r)});return !q};
      if(t==='p'){const d=pc==='w'?-1:1,startR=pc==='w'?6:1; if(this._b[fr+d]?.[fc]==null){add(fr+d,fc);if(fr===startR&&this._b[fr+2*d]?.[fc]==null)add(fr+2*d,fc)}for(const dc of [-1,1]){const r=fr+d,c=fc+dc;if(r>=0&&r<8&&c>=0&&c<8&&this._b[r][c]&&color(this._b[r][c])!==pc)add(r,c)}}
      if(t==='n')for(const [dr,dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]])add(fr+dr,fc+dc);
      const slide=(dirs)=>{for(const [dr,dc] of dirs){let r=fr+dr,c=fc+dc;while(r>=0&&r<8&&c>=0&&c<8){const q=this._b[r][c];if(q){if(color(q)!==pc)add(r,c);break}add(r,c);r+=dr;c+=dc}}};
      if(t==='b'||t==='q')slide([[-1,-1],[-1,1],[1,-1],[1,1]]);if(t==='r'||t==='q')slide([[-1,0],[1,0],[0,-1],[0,1]]);if(t==='k')for(const [dr,dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]])add(fr+dr,fc+dc);
      return out.filter(m=>{const tr=8-Number(m.to[1]),tc=files.indexOf(m.to[0]);if(t==='b'||t==='r'||t==='q')return pathClear(this._b,fr,fc,tr,tc);return true});
    }
    move({from,to,promotion='q'}){const legal=this.moves({square:from}).find(m=>m.to===to);if(!legal)return null;const fr=8-Number(from[1]),fc=files.indexOf(from[0]),tr=8-Number(to[1]),tc=files.indexOf(to[0]);let p=this._b[fr][fc];this._b[fr][fc]=null;if(p.toLowerCase()==='p'&&(tr===0||tr===7))p=promotion.toUpperCase();this._b[tr][tc]=p;this._history.push(from+'-'+to);this._turn=this._turn==='w'?'b':'w';return {...legal,san:from+'-'+to};}
  }
  window.Chess=LiteChess;
})();
