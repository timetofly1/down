// AUTO-GENERATED from the prototype template by scripts/transpile.py.
// Do not edit by hand: change the template or the transpiler, then re-run it.
/* eslint-disable */
import React from 'react';
import { CardDrag, Circle, Field, FakeStatusBar, LockScreen, OsmMap, Path, QR, Rect, Root, Slot, Stamp, Svg, T, V } from './ui';

export function Phone({ vm }: { vm: any }) {
  return (
    <Root s="width:390px;height:844px;flex:none;border-radius:54px;background:radial-gradient(70% 45% at 15% 8%,#FFB38F 0%,rgba(255,179,143,0) 70%),radial-gradient(80% 55% at 90% 55%,#FF7A3D 0%,rgba(255,122,61,0) 70%),radial-gradient(90% 50% at 20% 100%,#E8400C 0%,rgba(232,64,12,0) 70%),#FF5A1F;position:relative;overflow:hidden;box-shadow:0 0 0 11px #15120F,0 0 0 12px #4A443D,0 50px 90px rgba(21,18,15,.35);font-family:Geist,system-ui,sans-serif;color:#15120F" screen="Phone">
      <FakeStatusBar s="position:absolute;top:0;left:0;right:0;height:47px;z-index:90;display:flex;align-items:center;justify-content:space-between;padding:0 30px 0 38px;font:600 16px Geist,sans-serif;pointer-events:none">
        <T s="">{"9:41"}</T>
        <V s="position:absolute;left:50%;top:11px;width:122px;height:35px;margin-left:-61px;background:#000;border-radius:20px" />
        <V s="display:flex;gap:6px;align-items:center">
          <Svg width="18" height="12" viewBox="0 0 18 12">
            <Rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor" />
            <Rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="currentColor" />
            <Rect x="10" y="3" width="3" height="9" rx="1" fill="currentColor" />
            <Rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor" />
          </Svg>
          <Svg width="26" height="12" viewBox="0 0 26 12">
            <Rect x=".5" y=".5" width="22" height="11" rx="3.5" fill="none" stroke="currentColor" opacity=".4" />
            <Rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor" />
            <Rect x="24" y="4" width="1.6" height="4" rx=".8" fill="currentColor" opacity=".5" />
          </Svg>
        </V>
      </FakeStatusBar>
      <V s={`position:absolute;top:47px;left:0;right:0;bottom:83px;display:${vm.showSwipe};flex-direction:column`} screen="01 Swipe">
        <V s="display:flex;align-items:center;justify-content:space-between;padding:8px 18px 6px">
          <V s="border:0;background:none;padding:0;cursor:pointer;display:flex;align-items:center;gap:6px;color:#15120F" btn label="Plans you're going to" onPress={vm.toggleGoing}>
            <T s="font:800 30px/1 'Bricolage Grotesque',sans-serif;letter-spacing:-.04em">{"down"}<T s="color:#FFFDF8">{"."}</T></T>
            {vm.goingCount ? (
              <V s="height:20px;min-width:20px;padding:0 6px;box-sizing:border-box;border-radius:10px;background:#15120F;color:#FFFDF8;font:700 11px/20px Geist,sans-serif;text-align:center" span>
                <T>{vm.goingCount}</T>
              </V>
            ) : null}
          </V>
          <V s="display:flex;align-items:center;gap:8px">
            <V s="display:flex;align-items:center;gap:6px;height:34px;padding:0 12px 0 10px;border-radius:17px;background:rgba(255,253,248,.2);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.42);font:600 13px Geist,sans-serif;color:#15120F;cursor:pointer" btn>
              <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15120F" strokeWidth="2.6">
                <Path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
                <Circle cx="12" cy="9.5" r="2.4" />
              </Svg>
              <T>{"Dorchester, Boston"}</T>
              <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <Path d="m6 9 6 6 6-6" />
              </Svg>
            </V>
            <V s="position:relative;width:34px;height:34px;border-radius:17px;background:rgba(255,253,248,.2);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.42);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#15120F;padding:0" btn label="Inbox" onPress={vm.openInbox}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9z" />
                <Path d="M10 20a2 2 0 0 0 4 0" />
              </Svg>
              {vm.unread ? (
                <V s="position:absolute;top:-3px;right:-3px;min-width:16px;height:16px;border-radius:8px;background:#15120F;color:#FFFDF8;font:700 10px/16px Geist,sans-serif;padding:0 4px;box-sizing:border-box" span>
                  <T>{vm.unread}</T>
                </V>
              ) : null}
            </V>
            <V s="width:34px;height:34px;border-radius:17px;border:0;padding:0;background:#15120F;color:#F4EFE6;display:flex;align-items:center;justify-content:center;font:600 12px Geist,sans-serif;cursor:pointer" btn label="Profile" onPress={vm.openProfile}>
              <T>{"YO"}</T>
            </V>
          </V>
        </V>
        <V s="display:flex;gap:8px;padding:8px 18px 12px;overflow-x:auto;flex:none">
          {vm.chips.map((ch: any, i_ch: number) => (
              <V key={i_ch} s={`flex:none;height:34px;padding:0 14px;border-radius:17px;border:1px solid ${ch.border};background:${ch.bg};backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);color:${ch.col};font:600 13px Geist,sans-serif;cursor:pointer;transition:background .2s`} btn onPress={ch.onTap}>
                <T>{ch.label}</T>
              </V>
          ))}
        </V>
        <V s="flex:1;position:relative;margin:0 14px">
          {vm.cards.map((c: any, i_c: number) => (
              <CardDrag key={i_c} s={`position:absolute;inset:0;touch-action:none;user-select:none;cursor:grab;filter:drop-shadow(0 12px 22px rgba(21,18,15,.16));display:${c.display};transform:${c.transform};transition:${c.transition};z-index:${c.z}`} c={c}>
                <V s="position:absolute;inset:0;border-radius:26px;background:#FFFDF8;display:flex;flex-direction:column;overflow:hidden;-webkit-mask:radial-gradient(circle 13px at 0 calc(100% - 98px),#0000 96%,#000) left/51% 100% no-repeat,radial-gradient(circle 13px at 100% calc(100% - 98px),#0000 96%,#000) right/51% 100% no-repeat;mask:radial-gradient(circle 13px at 0 calc(100% - 98px),#0000 96%,#000) left/51% 100% no-repeat,radial-gradient(circle 13px at 100% calc(100% - 98px),#0000 96%,#000) right/51% 100% no-repeat" notch>
                  <V s="height:206px;flex:none;position:relative;background:#2A2420;margin:8px 8px 0;border-radius:20px;overflow:hidden">
                    <V s={`position:absolute;inset:0;pointer-events:${vm.slotPE}`}>
                      <Slot sid={`photo-${c.id}`} ph={`${c.ph}`} />
                    </V>
                    <V s="position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(12,9,7,.45) 0%,rgba(12,9,7,0) 34%,rgba(12,9,7,0) 62%,rgba(12,9,7,.5) 100%)" />
                    <V s="position:absolute;top:12px;left:12px;right:12px;display:flex;gap:6px;pointer-events:none">
                      <V s="height:24px;padding:0 9px;border-radius:12px;background:#FFFDF8;color:#15120F;font:600 10.5px/24px 'Geist Mono',monospace;letter-spacing:.06em" span>
                        <T>{c.tag}</T>
                      </V>
                      <V s="height:24px;padding:0 9px;border-radius:12px;background:rgba(12,9,7,.55);color:#fff;font:600 10.5px/24px 'Geist Mono',monospace;letter-spacing:.06em;backdrop-filter:blur(8px)" span>
                        <T>{c.hoodCaps}</T>
                      </V>
                    </V>
                    <Stamp s={`position:absolute;top:52px;left:16px;transform:rotate(-14deg);padding:6px 14px;border-radius:10px;background:#FF5A1F;color:#15120F;font:800 32px/1 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em;opacity:${c.stampDown};pointer-events:none;box-shadow:0 6px 20px rgba(0,0,0,.25)`} kind="down" c={c}>
                      <T>{"I'M DOWN"}</T>
                    </Stamp>
                    <Stamp s={`position:absolute;top:52px;right:16px;transform:rotate(14deg);padding:6px 16px;border-radius:10px;background:#FFFDF8;color:#15120F;font:800 32px/1 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em;opacity:${c.stampNah};pointer-events:none;box-shadow:0 6px 20px rgba(0,0,0,.25)`} kind="nah" c={c}>
                      <T>{"NAH"}</T>
                    </Stamp>
                    <V s="position:absolute;left:10px;bottom:10px;display:flex;align-items:center;gap:6px;height:30px;padding:0 10px 0 6px;border-radius:15px;background:rgba(255,253,248,.95);pointer-events:none">
                      <V s="display:flex;padding-right:4px">
                        {c.friendAvs.map((f: any, i_f: number) => (
                            <V key={i_f} s={`width:20px;height:20px;border-radius:10px;margin-right:-5px;background:${f.c};color:#fff;border:1.5px solid #FFFDF8;display:flex;align-items:center;justify-content:center;font:600 7.5px Geist,sans-serif`}>
                              <T>{f.i}</T>
                            </V>
                        ))}
                      </V>
                      <T s="font:600 12px Geist,sans-serif;color:#15120F">{c.friendsLabel}</T>
                    </V>
                  </V>
                  <V s="flex:1;min-height:0;padding:14px 18px 0;display:flex;flex-direction:column;gap:10px;pointer-events:none">
                    <V s="font:700 25px/1.04 'Bricolage Grotesque',sans-serif;letter-spacing:-.025em;text-wrap:balance">
                      <T>{c.title}</T>
                    </V>
                    <V s="display:flex;align-items:center;gap:8px">
                      <V s={`width:26px;height:26px;border-radius:13px;background:${c.hostColor};color:#fff;display:flex;align-items:center;justify-content:center;font:600 10px Geist,sans-serif`}>
                        <T>{c.hostAv}</T>
                      </V>
                      <T s="font:600 13.5px Geist,sans-serif">{c.host}</T>
                      <T s="font:400 13px Geist,sans-serif;color:rgba(21,18,15,.55)">{c.role}</T>
                    </V>
                    <V s="display:grid;grid-template-columns:1fr 1.25fr .8fr;gap:10px;padding-top:10px;border-top:1px solid rgba(21,18,15,.08)">
                      <V s="min-width:0">
                        <V s="font:600 9.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">
                          <T>{"WHEN"}</T>
                        </V>
                        <V s="font:600 13.5px Geist,sans-serif;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                          <T>{c.short}</T>
                        </V>
                      </V>
                      <V s="min-width:0">
                        <V s="font:600 9.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">
                          <T>{"WHERE"}</T>
                        </V>
                        <V s="font:600 13.5px Geist,sans-serif;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                          <T>{c.hood}</T>
                        </V>
                      </V>
                      <V s="min-width:0">
                        <V s="font:600 9.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">
                          <T>{"ENTRY"}</T>
                        </V>
                        <V s="font:600 13.5px Geist,sans-serif;margin-top:3px;color:#C2410C">
                          <T>{c.entry}</T>
                        </V>
                      </V>
                    </V>
                  </V>
                  <V s="position:absolute;left:22px;right:22px;bottom:97px;border-top:2px dashed rgba(21,18,15,.16)" />
                  <V s="height:98px;flex:none;padding:14px 18px;box-sizing:border-box;display:flex;gap:14px;align-items:center;pointer-events:none">
                    <V s="flex:1;min-width:0;display:flex;flex-direction:column;gap:8px">
                      <V s="display:flex;align-items:baseline;gap:6px;flex-wrap:wrap">
                        <T s="font:800 22px/1 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em">{c.n}<T s="color:rgba(21,18,15,.35)">{"/"}{c.goal}</T></T>
                        <T s="font:500 12.5px Geist,sans-serif;color:rgba(21,18,15,.62)">{"down \u00b7 "}{c.needLabel}</T>
                      </V>
                      <V s="height:6px;border-radius:3px;background:rgba(21,18,15,.08);overflow:hidden">
                        <V s={`height:100%;border-radius:3px;background:#FF5A1F;width:${c.pct};transition:width .6s cubic-bezier(.2,.8,.2,1)`} />
                      </V>
                    </V>
                    <V s="display:flex;flex-direction:column;align-items:center;gap:5px;flex:none">
                      <V s="width:58px;height:34px;background:repeating-linear-gradient(90deg,#15120F 0 2px,transparent 2px 4px,#15120F 4px 5px,transparent 5px 8px,#15120F 8px 11px,transparent 11px 12px,#15120F 12px 13px,transparent 13px 15px)" />
                      <T s="font:600 9.5px 'Geist Mono',monospace;letter-spacing:.08em">{c.ticketNo}</T>
                    </V>
                  </V>
                </V>
              </CardDrag>
          ))}
          {vm.empty ? (
            <V s="position:absolute;inset:0;border-radius:28px;border:1.5px dashed rgba(21,18,15,.35);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;text-align:center">
              <V s="font:700 26px/1.05 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em;text-wrap:balance">
                <T>{"That's every plan near you."}</T>
              </V>
              <V s="font:400 14px/1.45 Geist,sans-serif;color:rgba(21,18,15,.8);text-wrap:pretty">
                <T>{"Got an idea nobody's pitched yet? Put it out there and see who's down."}</T>
              </V>
              <V s="display:flex;gap:8px;margin-top:6px">
                <V s="height:44px;padding:0 18px;border-radius:22px;border:1px solid rgba(21,18,15,.16);background:#FFFDF8;font:600 14px Geist,sans-serif;color:#15120F;cursor:pointer" btn onPress={vm.resetDeck}>
                  <T>{"Start over"}</T>
                </V>
                <V s="height:44px;padding:0 18px;border-radius:22px;border:0;background:#15120F;font:600 14px Geist,sans-serif;color:#F4EFE6;cursor:pointer" btn onPress={vm.openPitch}>
                  <T>{"Pitch a plan"}</T>
                </V>
              </V>
            </V>
          ) : null}
        </V>
        <V s="display:flex;align-items:center;gap:10px;padding:14px 18px 12px;flex:none">
          <V s="width:56px;height:56px;flex:none;border-radius:28px;background:rgba(255,253,248,.2);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.42);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#15120F" btn label="Nah" onPress={vm.onNah} active="transform:scale(.92)">
            <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
              <Path d="M6 6l12 12M18 6 6 18" />
            </Svg>
          </V>
          <V s="flex:1;height:60px;border-radius:30px;border:0;background:#15120F;color:#FFFDF8;display:flex;align-items:center;justify-content:center;gap:8px;font:800 20px 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em;cursor:pointer;box-shadow:0 10px 24px rgba(90,25,0,.35)" btn onPress={vm.onDown} active="transform:scale(.97)">
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
              <Path d="m5 12.5 4.5 4.5L19 7.5" />
            </Svg>
            <T>{"I'm down"}</T>
          </V>
          <V s="width:46px;height:46px;flex:none;border-radius:23px;background:rgba(255,253,248,.2);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.42);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#15120F" btn label="Send to squad" onPress={vm.onShare} active="transform:scale(.92)">
            <Svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
              <Path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7z" />
            </Svg>
          </V>
        </V>
      </V>
      <V s={`position:absolute;top:0;left:0;right:0;bottom:83px;display:${vm.showMap};overflow:hidden;background:transparent`} screen="03 Map">
        <OsmMap vm={vm}>
          <V s={`position:absolute;left:${vm.youX};top:${vm.youY};width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:8px;background:#2D6AE0;border:3px solid #fff;box-shadow:0 0 0 8px rgba(45,106,224,.18)`} />
          {vm.pins.map((pn: any, i_pn: number) => (
              <V key={i_pn} s={`position:absolute;left:${pn.x};top:${pn.y};transform:translate(-50%,-50%) scale(${pn.scale});opacity:${pn.op};transition:transform .25s cubic-bezier(.2,.9,.2,1),opacity .25s;border:0;padding:0;background:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;z-index:${pn.z}`} btn onPress={pn.onTap}>
                <V s={`width:46px;height:46px;border-radius:23px;background:${pn.ring};display:flex;align-items:center;justify-content:center;box-shadow:0 6px 14px rgba(21,18,15,.22)`}>
                  <V s={`width:36px;height:36px;border-radius:18px;background:${pn.inner};color:${pn.innerCol};display:flex;align-items:center;justify-content:center;font:700 12px Geist,sans-serif`}>
                    <T>{pn.count}</T>
                  </V>
                </V>
                <V s="padding:2px 7px;border-radius:8px;background:#FFFDF8;font:600 11px Geist,sans-serif;color:#15120F;white-space:nowrap;box-shadow:0 2px 6px rgba(21,18,15,.12)" span>
                  <T>{pn.label}</T>
                </V>
              </V>
          ))}
        </OsmMap>
        <V s="position:absolute;z-index:10;top:55px;left:16px;right:16px;display:flex;flex-direction:column;gap:10px">
          <V s="height:48px;border-radius:24px;background:rgba(255,253,248,.66);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.6);box-shadow:0 6px 18px rgba(90,25,0,.12);display:flex;align-items:center;gap:10px;padding:0 16px;font:500 15px Geist,sans-serif;color:rgba(21,18,15,.7)">
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15120F" strokeWidth="2.4" strokeLinecap="round">
              <Circle cx="11" cy="11" r="7" />
              <Path d="m20 20-4-4" />
            </Svg>
            <T>{"Plans around Boston this week"}</T>
          </V>
          <V s="display:flex;gap:8px">
            {vm.mapChips.map((mc: any, i_mc: number) => (
                <V key={i_mc} s={`height:32px;padding:0 13px;border-radius:16px;border:1px solid rgba(255,255,255,.5);background:${mc.bg};backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);color:${mc.col};font:600 12.5px Geist,sans-serif;cursor:pointer;box-shadow:0 3px 10px rgba(21,18,15,.1)`} btn onPress={mc.onTap}>
                  <T>{mc.label}</T>
                </V>
            ))}
          </V>
        </V>
        <V s="position:absolute;z-index:10;left:12px;right:12px;bottom:12px;border-radius:26px;background:rgba(255,253,248,.78);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.65);box-shadow:0 14px 40px rgba(90,25,0,.22);padding:10px 14px 14px;display:flex;flex-direction:column;gap:12px">
          <V s="width:36px;height:4px;border-radius:2px;background:rgba(21,18,15,.15);align-self:center" />
          <V s="display:flex;gap:12px">
            <V s="width:84px;height:96px;border-radius:16px;overflow:hidden;flex:none;position:relative;background:#2A2420">
              {vm.mapThumbs.map((mt: any, i_mt: number) => (
                  <V key={i_mt} s={`position:absolute;inset:0;display:${mt.display};pointer-events:none`}>
                    <Slot sid={`photo-${mt.id}`} ph={" "} />
                  </V>
              ))}
            </V>
            <V s="flex:1;min-width:0;display:flex;flex-direction:column;gap:5px">
              <V s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.06em;color:#C2410C">
                <T>{vm.ms.tag}{" \u00b7 "}{vm.ms.hoodCaps}</T>
              </V>
              <V s="font:700 19px/1.1 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em;text-wrap:balance">
                <T>{vm.ms.title}</T>
              </V>
              <V s="font:500 12.5px Geist,sans-serif;color:rgba(21,18,15,.65)">
                <T>{vm.ms.short}{" \u00b7 "}{vm.ms.priceLabel}{" \u00b7 "}{vm.ms.transit}</T>
              </V>
            </V>
          </V>
          <V s="display:flex;flex-direction:column;gap:6px">
            <V s="height:6px;border-radius:3px;background:rgba(21,18,15,.1);overflow:hidden">
              <V s={`height:100%;background:#FF5A1F;border-radius:3px;width:${vm.ms.pct};transition:width .5s`} />
            </V>
            <V s="font:500 12.5px Geist,sans-serif">
              <T><T s="font-weight:700">{vm.ms.countLabel}</T>{" \u00b7 "}{vm.ms.needLabel}</T>
            </V>
          </V>
          <V s="display:flex;gap:8px">
            <V s="flex:1;height:46px;border-radius:23px;border:1px solid rgba(21,18,15,.16);background:rgba(255,253,248,.5);font:600 14px Geist,sans-serif;color:#15120F;cursor:pointer" btn onPress={vm.mapOpen}>
              <T>{"See the plan"}</T>
            </V>
            <V s={`flex:1;height:46px;border-radius:23px;border:0;background:${vm.ms.downBg};font:800 16px 'Bricolage Grotesque',sans-serif;color:#15120F;cursor:pointer`} btn onPress={vm.mapDown}>
              <T>{vm.ms.downLabel}</T>
            </V>
          </V>
        </V>
      </V>
      <V s={`position:absolute;top:47px;left:0;right:0;bottom:83px;display:${vm.showSquad};flex-direction:column;background:transparent`} screen="04 Squad chat">
        <V s="display:flex;align-items:center;gap:10px;padding:8px 16px 12px;background:rgba(255,253,248,.14);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border-bottom:1px solid rgba(255,255,255,.3)">
          <V s="display:flex">
            <V s="width:30px;height:30px;border-radius:15px;background:#C2410C;color:#fff;display:flex;align-items:center;justify-content:center;font:600 10px Geist,sans-serif;border:2px solid #FF8A4C">
              <T>{"PS"}</T>
            </V>
            <V s="width:30px;height:30px;border-radius:15px;background:#1F6F5C;color:#fff;display:flex;align-items:center;justify-content:center;font:600 10px Geist,sans-serif;border:2px solid #FF8A4C;margin-left:-10px">
              <T>{"JT"}</T>
            </V>
            <V s="width:30px;height:30px;border-radius:15px;background:#3B4BA8;color:#fff;display:flex;align-items:center;justify-content:center;font:600 10px Geist,sans-serif;border:2px solid #FF8A4C;margin-left:-10px">
              <T>{"DK"}</T>
            </V>
          </V>
          <V s="flex:1;min-width:0">
            <V s="font:700 17px 'Bricolage Grotesque',sans-serif;letter-spacing:-.01em">
              <T>{"the dot squad"}</T>
            </V>
            <V s="font:500 12px Geist,sans-serif;color:rgba(21,18,15,.75)">
              <T>{vm.squadSub}</T>
            </V>
          </V>
        </V>
        <V s="flex:1;overflow-y:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:10px" sref={vm.chatRef}>
          <V s="align-self:center;font:600 10.5px 'Geist Mono',monospace;letter-spacing:.08em;color:rgba(21,18,15,.65)">
            <T>{"TODAY 6:12 PM"}</T>
          </V>
          {vm.msgs.map((m: any, i_m: number) => (
              <V key={i_m} s={`display:flex;gap:8px;align-items:flex-end;justify-content:${m.justify}`}>
                {m.showAv ? (
                  <V s={`width:26px;height:26px;flex:none;border-radius:13px;background:${m.avc};color:#fff;display:flex;align-items:center;justify-content:center;font:600 9px Geist,sans-serif`}>
                    <T>{m.av}</T>
                  </V>
                ) : null}
                <V s={`display:flex;flex-direction:column;gap:3px;max-width:78%;align-items:${m.align}`}>
                  {m.showAv ? (
                    <V s="font:600 11px Geist,sans-serif;color:rgba(21,18,15,.75);padding-left:4px" span>
                      <T>{m.who}</T>
                    </V>
                  ) : null}
                  {m.isText ? (
                    <V s={`padding:9px 13px;border-radius:18px;background:${m.bg};color:${m.col};font:400 15px/1.35 Geist,sans-serif;text-wrap:pretty`}>
                      <T>{m.text}</T>
                    </V>
                  ) : null}
                  {m.isPlan ? (
                    <V s="width:246px;text-align:left;padding:0;border:1px solid rgba(21,18,15,.1);border-radius:20px;overflow:hidden;background:#FFFDF8;cursor:pointer;color:#15120F;font-family:Geist,sans-serif" btn onPress={m.onOpen}>
                      <V s="height:96px;position:relative;background:#2A2420;pointer-events:none">
                        <Slot sid={`photo-${m.planId}`} ph={" "} />
                        <V s="position:absolute;top:10px;left:10px;height:22px;padding:0 8px;border-radius:11px;background:#FFFDF8;font:600 10px/22px 'Geist Mono',monospace;letter-spacing:.06em" span>
                          <T>{m.tag}</T>
                        </V>
                      </V>
                      <V s="padding:10px 12px 12px;display:flex;flex-direction:column;gap:6px">
                        <V s="font:700 16px/1.1 'Bricolage Grotesque',sans-serif;letter-spacing:-.01em">
                          <T>{m.title}</T>
                        </V>
                        <V s="font:500 12px Geist,sans-serif;color:rgba(21,18,15,.6)">
                          <T>{m.meta}</T>
                        </V>
                        <V s="height:5px;border-radius:3px;background:rgba(21,18,15,.1);overflow:hidden">
                          <V s={`height:100%;background:#FF5A1F;width:${m.pct}`} />
                        </V>
                        <V s="font:600 12px Geist,sans-serif">
                          <T>{m.countLabel}</T>
                        </V>
                      </V>
                    </V>
                  ) : null}
                  {m.isPoll ? (
                    <V s="width:262px;padding:14px;border-radius:20px;background:#FFFDF8;border:1px solid rgba(21,18,15,.1);display:flex;flex-direction:column;gap:10px">
                      <V s="display:flex;align-items:center;gap:6px;font:600 10.5px 'Geist Mono',monospace;letter-spacing:.08em;color:#C2410C">
                        <T>{"POLL \u00b7 AFTER-HOURS FADES"}</T>
                      </V>
                      <V s="font:700 17px/1.15 'Bricolage Grotesque',sans-serif;letter-spacing:-.01em">
                        <T>{"Which night works?"}</T>
                      </V>
                      {vm.squadPoll.map((o: any, i_o: number) => (
                          <V key={i_o} s={`position:relative;height:44px;border-radius:12px;border:1.5px solid ${o.border};background:#FFFDF8;overflow:hidden;cursor:pointer;padding:0 12px;display:flex;align-items:center;gap:8px;font:600 14px Geist,sans-serif;color:#15120F`} btn onPress={o.onTap}>
                            <V s={`position:absolute;left:0;top:0;bottom:0;width:${o.w};background:${o.fill};transition:width .4s cubic-bezier(.2,.8,.2,1)`} />
                            <V s="position:relative;flex:1;text-align:left" span>
                              <T>{o.t}</T>
                            </V>
                            <V s="position:relative;display:flex">
                              {o.avs.map((a: any, i_a: number) => (
                                  <V key={i_a} s={`width:20px;height:20px;border-radius:10px;margin-left:-5px;background:${a.c};color:#fff;border:1.5px solid #FFFDF8;display:flex;align-items:center;justify-content:center;font:600 7.5px Geist,sans-serif`}>
                                    <T>{a.i}</T>
                                  </V>
                              ))}
                            </V>
                            <V s="position:relative;font:600 13px Geist,sans-serif;min-width:12px;text-align:right" span>
                              <T>{o.n}</T>
                            </V>
                          </V>
                      ))}
                      <V s="font:500 12px Geist,sans-serif;color:rgba(21,18,15,.55)">
                        <T>{"Results go to Marcus. Top pick sets the date."}</T>
                      </V>
                    </V>
                  ) : null}
                </V>
              </V>
          ))}
        </V>
        <V s="padding:8px 12px 10px;display:flex;flex-direction:column;gap:8px;background:rgba(255,253,248,.1);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border-top:1px solid rgba(255,255,255,.3)">
          <V s="height:48px;border-radius:24px;border:0;background:#15120F;color:#F4EFE6;display:flex;align-items:center;justify-content:space-between;padding:0 8px 0 18px;cursor:pointer;font:600 14px Geist,sans-serif" btn onPress={vm.squadLock}>
            <T s="">{vm.squadLockLabel}</T>
            <V s="height:34px;padding:0 14px;border-radius:17px;background:#FF5A1F;color:#15120F;font:800 15px/34px 'Bricolage Grotesque',sans-serif" span>
              <T>{"Lock it in together"}</T>
            </V>
          </V>
          <V s="display:flex;gap:8px;align-items:center">
            <V s="width:42px;height:42px;flex:none;border-radius:21px;background:rgba(255,253,248,.2);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.42);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#15120F;padding:0" btn label="Pitch a plan" onPress={vm.openPitch}>
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <Path d="M12 5v14M5 12h14" />
              </Svg>
            </V>
            <Field s="flex:1;height:42px;border-radius:21px;background:rgba(255,253,248,.2);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.42);padding:0 16px;font:400 15px Geist,sans-serif;color:#15120F;outline:none" value={vm.draft} placeholder="Message the squad" onChange={vm.onDraft} onKey={vm.onDraftKey} />
            <V s="width:42px;height:42px;border-radius:21px;border:0;background:#15120F;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#FFFDF8" btn label="Send" onPress={vm.sendDraft}>
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M12 19V5M5 12l7-7 7 7" />
              </Svg>
            </V>
          </V>
        </V>
      </V>
      <V s={`position:absolute;top:47px;left:0;right:0;bottom:83px;display:${vm.showHost};flex-direction:column;overflow-y:auto`} screen="05 Host earnings">
        <V s="padding:8px 18px 0;display:flex;align-items:center;justify-content:space-between">
          <V s="">
            <V s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.72)">
              <T>{"HOST VIEW \u00b7 MARCUS BELL"}</T>
            </V>
            <V s="font:800 30px/1.1 'Bricolage Grotesque',sans-serif;letter-spacing:-.03em">
              <T>{"Earnings"}</T>
            </V>
          </V>
          <V s="display:flex;padding:3px;border-radius:18px;background:rgba(255,253,248,.2);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.42)">
            {vm.ranges.map((r: any, i_r: number) => (
                <V key={i_r} s={`height:30px;padding:0 13px;border-radius:15px;border:0;background:${r.bg};font:600 13px Geist,sans-serif;color:#15120F;cursor:pointer;box-shadow:${r.sh}`} btn onPress={r.onTap}>
                  <T>{r.label}</T>
                </V>
            ))}
          </V>
        </V>
        <V s="margin:16px 14px 0;padding:18px;border-radius:26px;background:#15120F;color:#F4EFE6;display:flex;flex-direction:column;gap:16px">
          <V s="">
            <V s="font:500 13px Geist,sans-serif;opacity:.7">
              <T>{vm.earn.period}</T>
            </V>
            <V s="font:800 52px/1 'Bricolage Grotesque',sans-serif;letter-spacing:-.04em;margin-top:6px">
              <T>{vm.earn.total}</T>
            </V>
            <V s="font:500 13px Geist,sans-serif;color:#FFB38F;margin-top:6px">
              <T>{vm.earn.delta}</T>
            </V>
          </V>
          <V s="display:flex;align-items:flex-end;gap:8px;height:120px">
            {vm.earn.bars.map((b: any, i_b: number) => (
                <V key={i_b} s="flex:1;height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:6px">
                  <V s={`width:100%;height:${b.h};min-height:3px;border-radius:6px;background:${b.bg};transition:height .5s cubic-bezier(.2,.8,.2,1)`} />
                  <T s="font:600 10px 'Geist Mono',monospace;opacity:.6">{b.l}</T>
                </V>
            ))}
          </V>
          <V s="height:50px;border-radius:25px;border:0;background:#FF5A1F;color:#15120F;font:800 17px 'Bricolage Grotesque',sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:0 20px" btn>
            <T s="">{"Cash out"}</T>
            <T s="">{vm.earn.avail}{" available"}</T>
          </V>
        </V>
        <V s="margin:12px 14px 0;padding:16px 14px;border-radius:26px;background:rgba(255,253,248,.66);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.6);display:flex;flex-direction:column;gap:14px">
          <V s="display:flex;align-items:center;justify-content:space-between">
            <V s="font:700 18px 'Bricolage Grotesque',sans-serif;letter-spacing:-.01em">
              <T>{"Calendar"}</T>
            </V>
            <V s="display:flex;padding:3px;border-radius:18px;background:rgba(21,18,15,.07)">
              {vm.cal.views.map((cv: any, i_cv: number) => (
                  <V key={i_cv} s={`height:28px;padding:0 12px;border-radius:14px;border:0;background:${cv.bg};font:600 12.5px Geist,sans-serif;color:#15120F;cursor:pointer;box-shadow:${cv.sh}`} btn onPress={cv.onTap}>
                    <T>{cv.label}</T>
                  </V>
              ))}
            </V>
          </V>
          <V s="display:flex;align-items:center;justify-content:space-between">
            <V s="width:32px;height:32px;border-radius:16px;border:1px solid rgba(21,18,15,.12);background:#FFFDF8;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#15120F" btn label="Previous" onPress={vm.cal.prev}>
              <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <Path d="m15 6-6 6 6 6" />
              </Svg>
            </V>
            <T s="font:600 14px Geist,sans-serif">{vm.cal.label}</T>
            <V s="width:32px;height:32px;border-radius:16px;border:1px solid rgba(21,18,15,.12);background:#FFFDF8;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#15120F" btn label="Next" onPress={vm.cal.next}>
              <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <Path d="m9 6 6 6-6 6" />
              </Svg>
            </V>
          </V>
          {vm.cal.isWeek ? (
            <V s="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px">
              {vm.cal.weekDays.map((wd: any, i_wd: number) => (
                  <V key={i_wd} s="border:0;background:none;padding:0;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;color:#15120F" btn onPress={wd.onTap}>
                    <T s="font:600 10px 'Geist Mono',monospace;letter-spacing:.06em;color:rgba(21,18,15,.5)">{wd.dow}</T>
                    <V s={`width:38px;height:38px;border-radius:19px;background:${wd.bg};color:${wd.col};box-shadow:inset 0 0 0 2px ${wd.ring};display:flex;align-items:center;justify-content:center;font:700 15px Geist,sans-serif;transition:background .2s`}>
                      <T>{wd.n}</T>
                    </V>
                    <V s="display:flex;gap:3px;height:6px">
                      {wd.dots.map((dt: any, i_dt: number) => (
                          <V key={i_dt} s={`width:6px;height:6px;border-radius:3px;background:${dt.c}`} />
                      ))}
                    </V>
                  </V>
              ))}
            </V>
          ) : null}
          {vm.cal.isMonth ? (
            <V s="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:2px">
              {vm.cal.dows.map((dw: any, i_dw: number) => (
                  <V key={i_dw} s="text-align:center;font:600 10px 'Geist Mono',monospace;color:rgba(21,18,15,.5);padding-bottom:6px" span>
                    <T>{dw}</T>
                  </V>
              ))}
              {vm.cal.monthCells.map((mc2: any, i_mc2: number) => (
                  <V key={i_mc2} s={`height:44px;border-radius:12px;border:0;background:${mc2.bg};color:${mc2.col};box-shadow:inset 0 0 0 2px ${mc2.ring};cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;font:600 14px Geist,sans-serif;padding:0`} btn onPress={mc2.onTap}>
                    <T>{mc2.n}</T>
                    <V s="display:flex;gap:2px;height:5px">
                      {mc2.dotsM.map((dm: any, i_dm: number) => (
                          <V key={i_dm} s={`width:5px;height:5px;border-radius:3px;background:${dm.c}`} />
                      ))}
                    </V>
                  </V>
              ))}
            </V>
          ) : null}
          <V s="border-top:1px solid rgba(21,18,15,.08);padding-top:12px;display:flex;flex-direction:column;gap:8px">
            <V s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">
              <T>{vm.cal.selLabel}</T>
            </V>
            {vm.cal.dayEvents.map((ev: any, i_ev: number) => (
                <V key={i_ev} s="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:14px;background:rgba(255,253,248,.75)">
                  <V s={`width:8px;height:8px;border-radius:4px;flex:none;background:${ev.c}`} />
                  <V s="flex:1;min-width:0">
                    <V s="font:600 14px/1.25 Geist,sans-serif">
                      <T>{ev.title}</T>
                    </V>
                    <V s="font:500 11.5px Geist,sans-serif;color:rgba(21,18,15,.55);margin-top:2px">
                      <T>{ev.t}{" \u00b7 "}{ev.status}</T>
                    </V>
                  </V>
                  <V s="font:700 13.5px Geist,sans-serif;white-space:nowrap">
                    <T>{ev.amt}</T>
                  </V>
                </V>
            ))}
            {vm.cal.none ? (
              <V s="padding:12px;border-radius:14px;border:1.5px dashed rgba(21,18,15,.15);font:500 13px Geist,sans-serif;color:rgba(21,18,15,.55)">
                <T>{"Nothing on. Good night to pitch something."}</T>
              </V>
            ) : null}
          </V>
        </V>
        <V s="margin:12px 14px 0;padding:6px 16px;border-radius:22px;background:rgba(255,253,248,.66);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.6)">
          {vm.earn.rows.map((er: any, i_er: number) => (
              <V key={i_er} s={`display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid ${er.line}`}>
                <V s="">
                  <V s="font:600 14px Geist,sans-serif">
                    <T>{er.l}</T>
                  </V>
                  <V s="font:400 12px Geist,sans-serif;color:rgba(21,18,15,.55);margin-top:2px">
                    <T>{er.s}</T>
                  </V>
                </V>
                <V s="font:700 15px Geist,sans-serif">
                  <T>{er.v}</T>
                </V>
              </V>
          ))}
        </V>
        <V s="margin:12px 14px 0;padding:14px 16px;border-radius:22px;background:rgba(255,253,248,.2);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.42);font:500 13.5px/1.4 Geist,sans-serif;color:#15120F;text-wrap:pretty">
          <T><T s="font-weight:700;font-weight:700">{"62% of your guests"}</T>{" had never been to Fields Corner before your plans."}</T>
        </V>
        <V s="padding:20px 18px 8px;font:700 18px 'Bricolage Grotesque',sans-serif;letter-spacing:-.01em">
          <T>{"Your plans"}</T>
        </V>
        <V s="display:flex;flex-direction:column;gap:8px;padding:0 14px">
          {vm.hostPlans.map((hp: any, i_hp: number) => (
              <V key={i_hp} s="display:flex;gap:12px;align-items:center;padding:12px;border-radius:20px;background:rgba(255,253,248,.66);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.6)">
                <V s="flex:1;min-width:0">
                  <V s="display:flex;gap:6px;align-items:center">
                    <V s={`height:20px;padding:0 8px;border-radius:10px;background:${hp.pillBg};color:${hp.pillCol};font:600 10px/20px 'Geist Mono',monospace;letter-spacing:.06em`} span>
                      <T>{hp.stage}</T>
                    </V>
                    <T s="font:500 12px Geist,sans-serif;color:rgba(21,18,15,.55)">{hp.when}</T>
                  </V>
                  <V s="font:700 15.5px/1.2 'Bricolage Grotesque',sans-serif;margin-top:5px">
                    <T>{hp.title}</T>
                  </V>
                  <V s="font:500 12px Geist,sans-serif;color:rgba(21,18,15,.6);margin-top:2px">
                    <T>{hp.sub}</T>
                  </V>
                </V>
                <V s="text-align:right">
                  <V s="font:700 16px Geist,sans-serif">
                    <T>{hp.amt}</T>
                  </V>
                  <V s="font:500 11px Geist,sans-serif;color:rgba(21,18,15,.55)">
                    <T>{hp.amtSub}</T>
                  </V>
                </V>
              </V>
          ))}
        </V>
        <V s="padding:14px 14px 20px">
          <V s="width:100%;height:52px;border-radius:26px;border:1.5px dashed rgba(255,255,255,.7);background:rgba(255,253,248,.14);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);font:700 16px 'Bricolage Grotesque',sans-serif;color:#15120F;cursor:pointer" btn onPress={vm.openPitch}>
            <T>{"+ Pitch a new plan"}</T>
          </V>
        </V>
      </V>
      <V s="position:absolute;left:0;right:0;bottom:0;height:83px;background:rgba(255,253,248,.14);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border-top:1px solid rgba(255,255,255,.35);display:flex;padding:0 10px;box-sizing:border-box;z-index:20">
        {vm.tabs.map((t: any, i_t: number) => (
            <V key={i_t} s={`flex:1;border:0;background:none;padding:10px 0 0;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;color:${t.col};font:600 11px Geist,sans-serif;position:relative`} btn onPress={t.onTap}>
              <V s={`width:54px;height:30px;border-radius:15px;background:${t.pill};transition:background .2s;display:flex;align-items:center;justify-content:center`}>
                {t.i0 ? (
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <Rect x="6" y="3" width="12" height="17" rx="3" transform="rotate(8 12 12)" />
                    <Rect x="4" y="4" width="12" height="17" rx="3" fill={t.fill} />
                  </Svg>
                ) : null}
                {t.i1 ? (
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <Path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" fill={t.fill} />
                    <Circle cx="12" cy="9.5" r="2.4" fill="#F0501A" />
                  </Svg>
                ) : null}
                {t.i2 ? (
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
                    <Path d="M4 5h16v11H9l-5 4V5z" fill={t.fill} />
                  </Svg>
                ) : null}
                {t.i3 ? (
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
                    <Rect x="3" y="6" width="18" height="13" rx="3" fill={t.fill} />
                    <Path d="M3 10h18" />
                    <Circle cx="16.5" cy="14.5" r="1.3" fill="#F0501A" stroke="none" />
                  </Svg>
                ) : null}
              </V>
              <T>{t.label}</T>
              {t.badge ? (
                <V s="position:absolute;top:6px;left:50%;margin-left:6px;min-width:16px;height:16px;border-radius:8px;background:#15120F;color:#FFFDF8;font:700 10px/16px Geist,sans-serif;padding:0 4px;box-sizing:border-box" span>
                  <T>{t.badge}</T>
                </V>
              ) : null}
            </V>
        ))}
      </V>
      <V s={`position:absolute;left:16px;right:16px;top:58px;z-index:70;transform:${vm.toastT};opacity:${vm.toastO};transition:transform .4s cubic-bezier(.2,.9,.2,1),opacity .3s;pointer-events:none`}>
        <V s="border-radius:20px;background:rgba(21,18,15,.78);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.12);color:#F4EFE6;padding:12px 14px;display:flex;gap:12px;align-items:center;box-shadow:0 14px 30px rgba(21,18,15,.3)">
          <V s={`width:38px;height:38px;flex:none;border-radius:19px;background:${vm.toast.ring};display:flex;align-items:center;justify-content:center`}>
            <V s="width:30px;height:30px;border-radius:15px;background:#15120F;display:flex;align-items:center;justify-content:center;font:700 11px Geist,sans-serif">
              <T>{vm.toast.badge}</T>
            </V>
          </V>
          <V s="flex:1;min-width:0">
            <V s="font:700 15px 'Bricolage Grotesque',sans-serif">
              <T>{vm.toast.title}</T>
            </V>
            <V s="font:500 12.5px Geist,sans-serif;opacity:.75;margin-top:1px">
              <T>{vm.toast.sub}</T>
            </V>
          </V>
        </V>
      </V>
      <V s={`position:absolute;inset:0;z-index:40;background:rgba(12,9,7,.35);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);opacity:${vm.backdropO};pointer-events:${vm.backdropPE};transition:opacity .35s`} onPress={vm.closeAll} />
      <V s={`position:absolute;left:0;right:0;top:54px;bottom:0;z-index:50;background:#FFFDF8;border-radius:30px 30px 0 0;overflow:hidden;transform:${vm.detailT};transition:transform .45s cubic-bezier(.2,.9,.2,1);box-shadow:0 -10px 40px rgba(12,9,7,.2)`} screen="02 Plan detail">
        <V s="position:absolute;inset:0;overflow-y:auto;padding-bottom:120px" sref={vm.detailRef}>
          <V s="height:250px;position:relative;background:#2A2420">
            {vm.heroes.map((h: any, i_h: number) => (
                <V key={i_h} s={`position:absolute;inset:0;display:${h.display}`}>
                  <Slot sid={`photo-${h.id}`} ph={`${h.ph}`} />
                </V>
            ))}
            <V s="position:absolute;top:10px;left:0;right:0;display:flex;justify-content:center;pointer-events:none">
              <V s="width:40px;height:5px;border-radius:3px;background:rgba(255,255,255,.7)" />
            </V>
            <V s="position:absolute;top:16px;right:16px;width:36px;height:36px;border-radius:18px;border:0;background:rgba(12,9,7,.55);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(8px)" btn label="Close" onPress={vm.closeDetail}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                <Path d="M6 6l12 12M18 6 6 18" />
              </Svg>
            </V>
          </V>
          <V s="padding:18px 18px 0;display:flex;flex-direction:column;gap:18px">
            <V s="display:flex;flex-direction:column;gap:10px">
              <V s="display:flex;gap:6px">
                <V s="height:24px;padding:0 9px;border-radius:12px;background:#FFE4D6;color:#8A2E0B;font:600 10.5px/24px 'Geist Mono',monospace;letter-spacing:.06em" span>
                  <T>{vm.d.tag}</T>
                </V>
                <V s="height:24px;padding:0 9px;border-radius:12px;background:rgba(21,18,15,.06);font:600 10.5px/24px 'Geist Mono',monospace;letter-spacing:.06em" span>
                  <T>{vm.d.hoodCaps}</T>
                </V>
              </V>
              <V s="font:800 32px/1.02 'Bricolage Grotesque',sans-serif;letter-spacing:-.03em;text-wrap:balance">
                <T>{vm.d.title}</T>
              </V>
            </V>
            <V s="display:flex;align-items:center;gap:12px">
              <V s={`width:44px;height:44px;border-radius:22px;background:${vm.d.hostColor};color:#fff;display:flex;align-items:center;justify-content:center;font:600 14px Geist,sans-serif`}>
                <T>{vm.d.hostAv}</T>
              </V>
              <V s="flex:1;min-width:0">
                <V s="font:600 15px Geist,sans-serif">
                  <T>{vm.d.host}</T>
                </V>
                <V s="font:400 13px Geist,sans-serif;color:rgba(21,18,15,.6)">
                  <T>{vm.d.role}{" \u00b7 "}{vm.d.hosted}</T>
                </V>
              </V>
              <V s={`height:36px;padding:0 16px;border-radius:18px;border:1.5px solid #15120F;background:${vm.d.followBg};color:${vm.d.followCol};font:600 13px Geist,sans-serif;cursor:pointer;transition:background .2s`} btn onPress={vm.toggleFollow}>
                <T>{vm.d.followLabel}</T>
              </V>
            </V>
            <V s="font:400 15px/1.5 Geist,sans-serif;color:rgba(21,18,15,.82);text-wrap:pretty">
              <T>{vm.d.blurb}</T>
            </V>
            <V s="display:grid;grid-template-columns:1fr 1fr;gap:8px">
              <V s="padding:14px;border-radius:18px;background:#F4EFE6;display:flex;flex-direction:column;gap:4px">
                <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">{"WHEN"}</T>
                <T s="font:700 16px/1.2 'Bricolage Grotesque',sans-serif">{vm.d.when}</T>
                <T s="font:500 13px Geist,sans-serif;color:rgba(21,18,15,.65)">{vm.d.time}</T>
              </V>
              <V s="padding:14px;border-radius:18px;background:#F4EFE6;display:flex;flex-direction:column;gap:4px">
                <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">{"WHERE"}</T>
                <T s="font:700 16px/1.2 'Bricolage Grotesque',sans-serif">{vm.d.place}</T>
                <T s="font:500 13px Geist,sans-serif;color:rgba(21,18,15,.65)">{vm.d.transit}</T>
              </V>
            </V>
            <V s="padding:16px 4px 4px;position:relative">
              <V s="position:absolute;top:24px;left:12.5%;right:12.5%;height:3px;border-radius:2px;background:rgba(21,18,15,.12)">
                <V s={`height:100%;border-radius:2px;background:#FF5A1F;width:${vm.d.stageFill};transition:width .6s`} />
              </V>
              <V s="display:grid;grid-template-columns:repeat(4,1fr);position:relative">
                {vm.d.stages.map((st: any, i_st: number) => (
                    <V key={i_st} s="display:flex;flex-direction:column;align-items:center;gap:8px">
                      <V s={`width:19px;height:19px;border-radius:10px;box-sizing:border-box;border:3px solid ${st.ring};background:${st.dot};box-shadow:${st.glow}`} />
                      <T s={`font:${st.w} 12px Geist,sans-serif;color:${st.col}`}>{st.l}</T>
                    </V>
                ))}
              </V>
            </V>
            <V s="padding:16px;border-radius:22px;border:1px solid rgba(21,18,15,.1);display:flex;flex-direction:column;gap:12px">
              <V s="display:flex;align-items:baseline;justify-content:space-between">
                <V s="font:800 34px/1 'Bricolage Grotesque',sans-serif;letter-spacing:-.03em">
                  <T>{vm.d.count}<T s="font-size:20px;color:rgba(21,18,15,.4)">{" / "}{vm.d.goal}</T></T>
                </V>
                <T s="font:500 13px Geist,sans-serif;color:rgba(21,18,15,.6)">{"closes in "}{vm.d.closes}</T>
              </V>
              <V s="height:10px;border-radius:5px;background:rgba(21,18,15,.08);overflow:hidden">
                <V s={`height:100%;border-radius:5px;background:#FF5A1F;width:${vm.d.pct};transition:width .6s cubic-bezier(.2,.8,.2,1)`} />
              </V>
              <V s="font:600 14px Geist,sans-serif">
                <T>{vm.d.needLabel}</T>
              </V>
              <V s="display:flex;align-items:center;gap:10px;padding-top:12px;border-top:1px solid rgba(21,18,15,.08)">
                <V s="display:flex">
                  {vm.d.whoAvs.map((w: any, i_w: number) => (
                      <V key={i_w} s={`width:30px;height:30px;border-radius:15px;margin-right:-8px;background:${w.c};color:#fff;border:2px solid #FFFDF8;display:flex;align-items:center;justify-content:center;font:600 10px Geist,sans-serif`}>
                        <T>{w.i}</T>
                      </V>
                  ))}
                </V>
                <V s="font:500 13px/1.35 Geist,sans-serif;margin-left:8px;flex:1">
                  <T><T s="font-weight:700;font-weight:600">{"Who's down:"}</T>{" "}{vm.d.whoLabel}</T>
                </V>
              </V>
              <V s="font:500 13px/1.4 Geist,sans-serif;color:#8A2E0B;background:#FFE4D6;border-radius:12px;padding:10px 12px;text-wrap:pretty">
                <T>{vm.d.newLabel}</T>
              </V>
            </V>
            <V s="display:flex;flex-direction:column;gap:12px">
              <V s="font:700 19px 'Bricolage Grotesque',sans-serif;letter-spacing:-.01em">
                <T>{"Shape the plan"}</T>
              </V>
              {vm.d.polls.map((pl: any, i_pl: number) => (
                  <V key={i_pl} s="padding:14px;border-radius:20px;background:#F4EFE6;display:flex;flex-direction:column;gap:8px">
                    <V s="display:flex;justify-content:space-between;align-items:baseline">
                      <T s="font:600 15px Geist,sans-serif">{pl.q}</T>
                      <T s="font:500 12px Geist,sans-serif;color:rgba(21,18,15,.55)">{pl.total}</T>
                    </V>
                    {pl.opts.map((po: any, i_po: number) => (
                        <V key={i_po} s={`position:relative;height:44px;border-radius:12px;border:1.5px solid ${po.border};background:#FFFDF8;overflow:hidden;cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:0 14px;font:600 14px Geist,sans-serif;color:#15120F`} btn onPress={po.onTap}>
                          <V s={`position:absolute;left:0;top:0;bottom:0;width:${po.w};background:${po.fill};transition:width .45s cubic-bezier(.2,.8,.2,1)`} />
                          <V s="position:relative" span>
                            <T>{po.t}</T>
                          </V>
                          <V s="position:relative;font-weight:700" span>
                            <T>{po.pct}</T>
                          </V>
                        </V>
                    ))}
                  </V>
              ))}
            </V>
            <V s="display:flex;flex-direction:column;gap:10px">
              <V s="font:700 19px 'Bricolage Grotesque',sans-serif;letter-spacing:-.01em">
                <T>{"Lock it in"}</T>
              </V>
              {vm.d.tiers.map((ti: any, i_ti: number) => (
                  <V key={i_ti} s="text-align:left;padding:14px 16px;border-radius:18px;border:1.5px solid rgba(21,18,15,.12);background:#FFFDF8;cursor:pointer;display:flex;gap:12px;align-items:center;color:#15120F" btn onPress={ti.onTap}>
                    <V s="flex:1">
                      <V s="font:700 16px 'Bricolage Grotesque',sans-serif">
                        <T>{ti.label}</T>
                      </V>
                      <V s="font:400 13px/1.35 Geist,sans-serif;color:rgba(21,18,15,.62);margin-top:2px">
                        <T>{ti.sub}</T>
                      </V>
                    </V>
                    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <Path d="m9 6 6 6-6 6" />
                    </Svg>
                  </V>
              ))}
            </V>
          </V>
        </V>
        <V s="position:absolute;left:0;right:0;bottom:0;padding:12px 16px 28px;background:linear-gradient(180deg,rgba(255,253,248,0),#FFFDF8 28%);display:flex;gap:10px;align-items:center">
          <V s="flex:none;padding-left:4px">
            <V s="font:700 17px Geist,sans-serif">
              <T>{vm.d.priceBig}</T>
            </V>
            <V s="font:500 11.5px Geist,sans-serif;color:rgba(21,18,15,.55)">
              <T>{vm.d.priceSmall}</T>
            </V>
          </V>
          <V s={`flex:1;height:56px;border-radius:28px;border:0;background:${vm.d.ctaBg};color:${vm.d.ctaCol};font:800 18px 'Bricolage Grotesque',sans-serif;cursor:pointer;box-shadow:0 8px 20px rgba(255,90,31,.3)`} btn onPress={vm.d.onCta} active="transform:scale(.97)">
            <T>{vm.d.ctaLabel}</T>
          </V>
        </V>
      </V>
      <V s={`position:absolute;left:0;right:0;bottom:0;z-index:60;background:#FFFDF8;border-radius:30px 30px 0 0;padding:12px 18px 34px;transform:${vm.lockT};transition:transform .45s cubic-bezier(.2,.9,.2,1);box-shadow:0 -10px 40px rgba(12,9,7,.25);display:flex;flex-direction:column;gap:14px`} screen="06 Lock it in">
        <V s="width:40px;height:5px;border-radius:3px;background:rgba(21,18,15,.15);align-self:center" />
        {vm.lockChoose ? (
          <V s="display:flex;flex-direction:column;gap:14px">
            <V s="">
              <V s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:#C2410C">
                <T>{"LOCK IT IN"}</T>
              </V>
              <V s="font:800 26px/1.05 'Bricolage Grotesque',sans-serif;letter-spacing:-.025em;margin-top:4px;text-wrap:balance">
                <T>{vm.lk.title}</T>
              </V>
            </V>
            {vm.lk.tiers.map((lt: any, i_lt: number) => (
                <V key={i_lt} s={`text-align:left;padding:14px 16px;border-radius:18px;border:2px solid ${lt.border};background:${lt.bg};cursor:pointer;display:flex;gap:12px;align-items:center;color:#15120F;transition:border-color .2s,background .2s`} btn onPress={lt.onTap}>
                  <V s={`width:22px;height:22px;flex:none;border-radius:11px;box-sizing:border-box;border:2px solid ${lt.radio};display:flex;align-items:center;justify-content:center`}>
                    <V s={`width:10px;height:10px;border-radius:5px;background:${lt.dot}`} />
                  </V>
                  <V s="flex:1">
                    <V s="font:700 16px 'Bricolage Grotesque',sans-serif">
                      <T>{lt.label}</T>
                    </V>
                    <V s="font:400 13px/1.35 Geist,sans-serif;color:rgba(21,18,15,.62);margin-top:2px">
                      <T>{lt.sub}</T>
                    </V>
                  </V>
                  <V s="font:700 16px Geist,sans-serif">
                    <T>{lt.price}</T>
                  </V>
                </V>
            ))}
            <V s="display:flex;gap:10px;padding:12px 14px;border-radius:14px;background:#F4EFE6;font:500 13px/1.4 Geist,sans-serif;color:rgba(21,18,15,.75)">
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15120F" strokeWidth="2.2">
                <Path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3z" />
                <Path d="m8.5 12 2.5 2.5 4.5-5" />
              </Svg>
              <T s="text-wrap:pretty">{vm.lk.terms}</T>
            </V>
            <V s="height:56px;border-radius:28px;border:0;background:#15120F;color:#F4EFE6;font:800 18px 'Bricolage Grotesque',sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px" btn onPress={vm.confirmLock}>
              {vm.lockPaying ? (
                <V s="width:20px;height:20px;border-radius:10px;border:2.5px solid rgba(244,239,230,.3);border-top-color:#F4EFE6;animation:spin .8s linear infinite" />
              ) : null}
              <T>{vm.lk.cta}</T>
            </V>
          </V>
        ) : null}
        {vm.lockDone ? (
          <V s="display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center;padding:10px 0 4px;animation:rise .45s cubic-bezier(.2,.9,.2,1)">
            <V s="width:72px;height:72px;border-radius:36px;background:#FF5A1F;display:flex;align-items:center;justify-content:center">
              <Svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#15120F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <Path d="m5 12.5 4.5 4.5L19 7.5" />
              </Svg>
            </V>
            <V s="font:800 30px/1.05 'Bricolage Grotesque',sans-serif;letter-spacing:-.03em">
              <T>{vm.lk.doneTitle}</T>
            </V>
            <V s="font:400 15px/1.45 Geist,sans-serif;color:rgba(21,18,15,.7);max-width:300px;text-wrap:pretty">
              <T>{vm.lk.doneSub}</T>
            </V>
            <V s="display:flex;gap:8px;width:100%;margin-top:6px">
              <V s="flex:1;height:50px;border-radius:25px;border:1px solid rgba(21,18,15,.16);background:#FFFDF8;font:600 14px Geist,sans-serif;color:#15120F;cursor:pointer" btn onPress={vm.lockShare}>
                <T>{"Bring the squad"}</T>
              </V>
              <V s="flex:1;height:50px;border-radius:25px;border:0;background:#15120F;font:600 14px Geist,sans-serif;color:#F4EFE6;cursor:pointer" btn onPress={vm.closeAll}>
                <T>{"Keep swiping"}</T>
              </V>
            </V>
          </V>
        ) : null}
      </V>
      <V s={`position:absolute;inset:0;z-index:45;background:radial-gradient(70% 45% at 15% 8%,#FFB38F 0%,rgba(255,179,143,0) 70%),radial-gradient(80% 55% at 90% 55%,#FF7A3D 0%,rgba(255,122,61,0) 70%),radial-gradient(90% 50% at 20% 100%,#E8400C 0%,rgba(232,64,12,0) 70%),#FF5A1F;transform:${vm.profT};transition:transform .45s cubic-bezier(.2,.9,.2,1);overflow-y:auto;padding:54px 0 40px;box-sizing:border-box`} screen="08 Profile passport">
        <V s="display:flex;align-items:center;justify-content:space-between;padding:0 16px">
          <V s="width:38px;height:38px;border-radius:19px;background:rgba(255,253,248,.2);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.42);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#15120F;padding:0" btn label="Back" onPress={vm.closeProfile}>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
              <Path d="m15 6-6 6 6 6" />
            </Svg>
          </V>
          <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em">{"PROFILE"}</T>
          <V s="width:38px" />
        </V>
        <V s="display:flex;flex-direction:column;align-items:center;gap:6px;padding:18px 18px 0;text-align:center">
          <V s="width:76px;height:76px;border-radius:38px;background:#15120F;color:#FFFDF8;display:flex;align-items:center;justify-content:center;font:700 24px Geist,sans-serif;box-shadow:0 0 0 4px rgba(255,253,248,.35)">
            <T>{"YO"}</T>
          </V>
          <V s="font:800 28px/1.1 'Bricolage Grotesque',sans-serif;letter-spacing:-.03em;margin-top:6px">
            <T>{"Yara Okafor"}</T>
          </V>
          <V s="font:500 13.5px Geist,sans-serif;color:rgba(21,18,15,.75)">
            <T>{"Dorchester \u00b7 down since Sep 2026"}</T>
          </V>
        </V>
        <V s="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:18px 14px 0">
          {vm.profStats.map((ps: any, i_ps: number) => (
              <V key={i_ps} s="padding:12px;border-radius:18px;background:rgba(255,253,248,.2);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.42);display:flex;flex-direction:column;gap:2px">
                <T s="font:800 26px/1 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em">{ps.v}</T>
                <T s="font:500 12px/1.25 Geist,sans-serif;color:rgba(21,18,15,.75)">{ps.l}</T>
              </V>
          ))}
        </V>
        <V s="margin:12px 14px 0;padding:16px 14px 18px;border-radius:26px;background:rgba(255,253,248,.66);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.6);display:flex;flex-direction:column;gap:14px">
          <V s="display:flex;justify-content:space-between;align-items:baseline">
            <T s="font:800 22px 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em">{"Passport"}</T>
            <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.6)">{vm.stampCount}</T>
          </V>
          <V s="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 6px">
            {vm.stamps.map((sp: any, i_sp: number) => (
                <V key={i_sp} s="display:flex;align-items:center;justify-content:center;padding:4px 0">
                  <V s={`width:96px;height:96px;border-radius:48px;box-sizing:border-box;border:2.5px ${sp.bstyle} ${sp.c};color:${sp.c};transform:rotate(${sp.rot});opacity:${sp.op};position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;text-align:center;background:${sp.bg}`}>
                    <V s={`position:absolute;inset:5px;border-radius:50%;border:1px dashed ${sp.inner}`} />
                    <V s="font:600 8.5px 'Geist Mono',monospace;letter-spacing:.08em;max-width:70px;line-height:1.2" span>
                      <T>{sp.h}</T>
                    </V>
                    <V s="font:800 13px/1.05 'Bricolage Grotesque',sans-serif;max-width:72px" span>
                      <T>{sp.p}</T>
                    </V>
                    <T s="font:600 8.5px 'Geist Mono',monospace;letter-spacing:.08em">{sp.d}</T>
                  </V>
                </V>
            ))}
          </V>
          <V s="font:500 13px/1.4 Geist,sans-serif;color:rgba(21,18,15,.7);text-wrap:pretty">
            <T>{"Every plan you show up to stamps a new neighborhood. 18 left to go."}</T>
          </V>
        </V>
        <V s="padding:14px">
          <V s="width:100%;height:48px;border-radius:24px;background:rgba(255,253,248,.2);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.42);font:600 14px Geist,sans-serif;color:#15120F;cursor:pointer" btn onPress={vm.replayOnb}>
            <T>{"Replay onboarding"}</T>
          </V>
        </V>
      </V>
      <V s={`position:absolute;left:0;right:0;bottom:0;z-index:60;background:#FFFDF8;border-radius:30px 30px 0 0;padding:12px 16px 30px;transform:${vm.inboxT};transition:transform .45s cubic-bezier(.2,.9,.2,1);box-shadow:0 -10px 40px rgba(12,9,7,.25);display:flex;flex-direction:column;gap:12px`} screen="09 Inbox">
        <V s="width:40px;height:5px;border-radius:3px;background:rgba(21,18,15,.15);align-self:center" />
        <V s="display:flex;justify-content:space-between;align-items:center;padding:0 2px">
          <T s="font:800 26px 'Bricolage Grotesque',sans-serif;letter-spacing:-.025em">{"Inbox"}</T>
          <V s="border:0;background:none;font:600 13px Geist,sans-serif;color:#C2410C;cursor:pointer;padding:6px 0" btn onPress={vm.markRead}>
            <T>{"Mark all read"}</T>
          </V>
        </V>
        <V s="display:flex;flex-direction:column">
          {vm.inbox.map((ib: any, i_ib: number) => (
              <V key={i_ib} s="display:flex;gap:12px;align-items:center;padding:12px 4px;border:0;border-bottom:1px solid rgba(21,18,15,.07);background:none;text-align:left;cursor:pointer;color:#15120F" btn onPress={ib.onTap}>
                <V s={`width:42px;height:42px;flex:none;border-radius:21px;background:${ib.c};color:${ib.tc};display:flex;align-items:center;justify-content:center;font:700 12px Geist,sans-serif`}>
                  <T>{ib.i}</T>
                </V>
                <V s="flex:1;min-width:0">
                  <V s="font:600 14.5px/1.25 Geist,sans-serif">
                    <T>{ib.t}</T>
                  </V>
                  <V s="font:400 13px/1.35 Geist,sans-serif;color:rgba(21,18,15,.6);margin-top:2px">
                    <T>{ib.s}</T>
                  </V>
                </V>
                <V s="display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex:none">
                  <T s="font:500 12px Geist,sans-serif;color:rgba(21,18,15,.5)">{ib.time}</T>
                  <V s={`width:9px;height:9px;border-radius:5px;background:${ib.dot}`} />
                </V>
              </V>
          ))}
        </V>
      </V>
      <V s={`position:absolute;left:0;right:0;top:54px;bottom:0;z-index:60;background:#FFFDF8;border-radius:30px 30px 0 0;transform:${vm.pitchT};transition:transform .45s cubic-bezier(.2,.9,.2,1);box-shadow:0 -10px 40px rgba(12,9,7,.25);display:flex;flex-direction:column;padding:14px 18px 28px;box-sizing:border-box;gap:16px`} screen="10 Pitch a plan">
        <V s="display:flex;align-items:center;justify-content:space-between">
          <V s="width:36px;height:36px;border-radius:18px;border:0;background:rgba(21,18,15,.07);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#15120F;padding:0" btn label="Close" onPress={vm.closePitch}>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
              <Path d="M6 6l12 12M18 6 6 18" />
            </Svg>
          </V>
          <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:#C2410C">{"PITCH TO THE DOT SQUAD"}</T>
          <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">{vm.pt.stepLabel}</T>
        </V>
        <V s="display:flex;gap:6px">
          {vm.pt.bars.map((pb: any, i_pb: number) => (
              <V key={i_pb} s={`flex:1;height:4px;border-radius:2px;background:${pb};transition:background .3s`} />
          ))}
        </V>
        <V s="flex:1;min-height:0;overflow-y:auto;display:flex;flex-direction:column;gap:18px">
          {vm.pt.s0 ? (
            <V s="display:flex;flex-direction:column;gap:18px">
              <V s="display:flex;flex-direction:column;gap:8px">
                <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">{"WHAT'S THE PLAN?"}</T>
                <Field s="border:0;outline:none;resize:none;background:#F4EFE6;border-radius:18px;padding:14px 16px;font:700 24px/1.15 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em;color:#15120F" value={vm.pt.title} onChange={vm.pt.onTitle} multiline rows={3} />
              </V>
              <V s="display:flex;flex-direction:column;gap:8px">
                <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">{"WHERE"}</T>
                <V s="display:flex;flex-wrap:wrap;gap:8px">
                  {vm.pt.hoods.map((ph: any, i_ph: number) => (
                      <V key={i_ph} s={`height:38px;padding:0 14px;border-radius:19px;border:1.5px solid ${ph.border};background:${ph.bg};color:${ph.col};font:600 13.5px Geist,sans-serif;cursor:pointer`} btn onPress={ph.onTap}>
                        <T>{ph.t}</T>
                      </V>
                  ))}
                </V>
              </V>
              <V s="display:flex;flex-direction:column;gap:8px">
                <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">{"WHEN"}</T>
                <V s="display:flex;flex-wrap:wrap;gap:8px">
                  {vm.pt.whens.map((pw: any, i_pw: number) => (
                      <V key={i_pw} s={`height:38px;padding:0 14px;border-radius:19px;border:1.5px solid ${pw.border};background:${pw.bg};color:${pw.col};font:600 13.5px Geist,sans-serif;cursor:pointer`} btn onPress={pw.onTap}>
                        <T>{pw.t}</T>
                      </V>
                  ))}
                </V>
              </V>
            </V>
          ) : null}
          {vm.pt.s1 ? (
            <V s="display:flex;flex-direction:column;gap:20px">
              <V s="display:flex;flex-direction:column;gap:10px">
                <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">{"HOW MANY NEED TO BE DOWN?"}</T>
                <V s="display:flex;align-items:center;justify-content:space-between;padding:14px;border-radius:22px;background:#F4EFE6">
                  <V s="width:52px;height:52px;border-radius:26px;border:1px solid rgba(21,18,15,.14);background:#FFFDF8;font:600 24px Geist,sans-serif;color:#15120F;cursor:pointer" btn label="Fewer" onPress={vm.pt.dec}>
                    <T>{"\u2212"}</T>
                  </V>
                  <T s="font:800 72px/1 'Bricolage Grotesque',sans-serif;letter-spacing:-.04em">{vm.pt.goal}</T>
                  <V s="width:52px;height:52px;border-radius:26px;border:1px solid rgba(21,18,15,.14);background:#FFFDF8;font:600 24px Geist,sans-serif;color:#15120F;cursor:pointer" btn label="More" onPress={vm.pt.inc}>
                    <T>{"+"}</T>
                  </V>
                </V>
                <T s="font:500 13.5px/1.4 Geist,sans-serif;color:rgba(21,18,15,.65);text-wrap:pretty">{vm.pt.goalHelp}</T>
              </V>
              <V s="display:flex;flex-direction:column;gap:8px">
                <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">{"ENTRY"}</T>
                <V s="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
                  {vm.pt.entries.map((pe: any, i_pe: number) => (
                      <V key={i_pe} s={`height:46px;border-radius:14px;border:1.5px solid ${pe.border};background:${pe.bg};color:${pe.col};font:600 14px Geist,sans-serif;cursor:pointer`} btn onPress={pe.onTap}>
                        <T>{pe.t}</T>
                      </V>
                  ))}
                </V>
              </V>
              <V s="display:flex;flex-direction:column;gap:8px">
                <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">{"CLOSES IN"}</T>
                <V s="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
                  {vm.pt.closesOpts.map((pc: any, i_pc: number) => (
                      <V key={i_pc} s={`height:46px;border-radius:14px;border:1.5px solid ${pc.border};background:${pc.bg};color:${pc.col};font:600 14px Geist,sans-serif;cursor:pointer`} btn onPress={pc.onTap}>
                        <T>{pc.t}</T>
                      </V>
                  ))}
                </V>
              </V>
            </V>
          ) : null}
          {vm.pt.s2 ? (
            <V s="display:flex;flex-direction:column;gap:10px">
              <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">{"LET THE SQUAD SHAPE IT"}</T>
              <Field s="height:54px;border:0;outline:none;background:#F4EFE6;border-radius:16px;padding:0 16px;font:700 19px 'Bricolage Grotesque',sans-serif;color:#15120F" value={vm.pt.q} onChange={vm.pt.onQ} />
              {vm.pt.opts.map((po2: any, i_po2: number) => (
                  <V key={i_po2} s="display:flex;align-items:center;gap:10px;height:48px;border-radius:14px;border:1.5px solid rgba(21,18,15,.1);padding:0 6px 0 14px">
                    <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.45)">{po2.n}</T>
                    <Field s="flex:1;border:0;outline:none;background:none;font:500 15px Geist,sans-serif;color:#15120F" value={po2.t} onChange={po2.onChange} />
                  </V>
              ))}
              <T s="font:500 13px/1.4 Geist,sans-serif;color:rgba(21,18,15,.6);text-wrap:pretty">{"Everyone who swipes right gets a vote. The top pick locks in when the plan hits its goal."}</T>
            </V>
          ) : null}
          {vm.pt.s3 ? (
            <V s="display:flex;flex-direction:column;gap:14px">
              <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">{"PREVIEW"}</T>
              <V s="border-radius:24px;background:#FFFDF8;box-shadow:0 12px 30px rgba(21,18,15,.14);border:1px solid rgba(21,18,15,.06);overflow:hidden">
                <V s="height:130px;margin:8px 8px 0;border-radius:18px;overflow:hidden;position:relative;background:#2A2420">
                  <Slot sid={"photo-mine"} ph={"Drop a photo for your plan"} />
                  <V s="position:absolute;top:10px;left:10px;height:22px;padding:0 8px;border-radius:11px;background:#FFFDF8;font:600 10px/22px 'Geist Mono',monospace;letter-spacing:.06em;pointer-events:none" span>
                    <T>{"SQUAD PITCH"}</T>
                  </V>
                </V>
                <V s="padding:12px 16px 14px;display:flex;flex-direction:column;gap:10px">
                  <V s="font:700 21px/1.08 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em;text-wrap:balance">
                    <T>{vm.pt.title}</T>
                  </V>
                  <V s="display:grid;grid-template-columns:1fr 1.2fr .8fr;gap:8px;padding-top:10px;border-top:1px solid rgba(21,18,15,.08)">
                    <V s="">
                      <V s="font:600 9.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">
                        <T>{"WHEN"}</T>
                      </V>
                      <V s="font:600 13px Geist,sans-serif;margin-top:3px">
                        <T>{vm.pt.when}</T>
                      </V>
                    </V>
                    <V s="">
                      <V s="font:600 9.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">
                        <T>{"WHERE"}</T>
                      </V>
                      <V s="font:600 13px Geist,sans-serif;margin-top:3px">
                        <T>{vm.pt.hood}</T>
                      </V>
                    </V>
                    <V s="">
                      <V s="font:600 9.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">
                        <T>{"ENTRY"}</T>
                      </V>
                      <V s="font:600 13px Geist,sans-serif;margin-top:3px;color:#C2410C">
                        <T>{vm.pt.entry}</T>
                      </V>
                    </V>
                  </V>
                  <V s="display:flex;flex-direction:column;gap:6px;padding-top:10px;border-top:2px dashed rgba(21,18,15,.14)">
                    <V s="font:600 13px Geist,sans-serif">
                      <T>{"1 of "}{vm.pt.goal}{" down \u00b7 "}{vm.pt.need}{" more and it happens"}</T>
                    </V>
                    <V s="height:6px;border-radius:3px;background:rgba(21,18,15,.08);overflow:hidden">
                      <V s={`height:100%;width:${vm.pt.pct};background:#FF5A1F`} />
                    </V>
                  </V>
                </V>
              </V>
              <T s="font:500 13.5px/1.4 Geist,sans-serif;color:rgba(21,18,15,.65);text-wrap:pretty">{vm.pt.reach}</T>
            </V>
          ) : null}
        </V>
        <V s="display:flex;gap:10px;flex:none">
          {vm.pt.canBack ? (
            <V s="height:56px;padding:0 22px;border-radius:28px;border:1px solid rgba(21,18,15,.16);background:#FFFDF8;font:600 15px Geist,sans-serif;color:#15120F;cursor:pointer" btn onPress={vm.pt.back}>
              <T>{"Back"}</T>
            </V>
          ) : null}
          <V s="flex:1;height:56px;border-radius:28px;border:0;background:#FF5A1F;font:800 18px 'Bricolage Grotesque',sans-serif;color:#15120F;cursor:pointer;box-shadow:0 8px 20px rgba(255,90,31,.3)" btn onPress={vm.pt.next} active="transform:scale(.97)">
            <T>{vm.pt.cta}</T>
          </V>
        </V>
      </V>
      <V s={`position:absolute;inset:0;z-index:80;background:#FF5A1F;padding:64px 20px 30px;box-sizing:border-box;display:flex;flex-direction:column;gap:18px;opacity:${vm.onO};pointer-events:${vm.onPE};transform:${vm.onT};transition:opacity .4s,transform .5s cubic-bezier(.2,.9,.2,1)`} screen="07 It's on">
        <V s="position:absolute;top:56px;right:18px;width:38px;height:38px;border-radius:19px;border:0;background:rgba(21,18,15,.12);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#15120F" btn label="Close" onPress={vm.closeOn}>
          <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
            <Path d="M6 6l12 12M18 6 6 18" />
          </Svg>
        </V>
        <V s="font:600 11px 'Geist Mono',monospace;letter-spacing:.12em;margin-top:8px">
          <T>{vm.on.goalLine}</T>
        </V>
        <V s="font:800 92px/.86 'Bricolage Grotesque',sans-serif;letter-spacing:-.06em" onPress={vm.replayConfetti}>
          <T>{"It's"}{"\n"}{"on."}</T>
        </V>
        <V s="font:500 16px/1.4 Geist,sans-serif;max-width:320px;text-wrap:pretty">
          <T>{vm.on.sub}</T>
        </V>
        <V s={`margin-top:auto;border-radius:24px;background:#FFFDF8;color:#15120F;overflow:hidden;box-shadow:0 24px 50px rgba(90,30,5,.35);transform:${vm.onTicketT};transition:transform .7s cubic-bezier(.2,.9,.2,1) .15s`}>
          <V s="padding:18px 18px 16px;display:flex;flex-direction:column;gap:12px">
            <V s="display:flex;justify-content:space-between;align-items:center">
              <T s="font:800 20px 'Bricolage Grotesque',sans-serif;letter-spacing:-.03em">{"down"}<T s="color:#FF5A1F">{"."}</T></T>
              <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.08em;color:rgba(21,18,15,.55)">{vm.on.ticketNo}</T>
            </V>
            <V s="font:800 24px/1.05 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em;text-wrap:balance">
              <T>{vm.on.title}</T>
            </V>
            <V s="display:grid;grid-template-columns:1fr 1fr;gap:10px">
              <V s="">
                <V s="font:600 10px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">
                  <T>{"WHEN"}</T>
                </V>
                <V s="font:600 14px Geist,sans-serif;margin-top:2px">
                  <T>{vm.on.when}</T>
                </V>
              </V>
              <V s="">
                <V s="font:600 10px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.5)">
                  <T>{"WHERE"}</T>
                </V>
                <V s="font:600 14px Geist,sans-serif;margin-top:2px">
                  <T>{vm.on.place}</T>
                </V>
              </V>
            </V>
          </V>
          <V s="position:relative;height:0;border-top:2px dashed rgba(21,18,15,.15);margin:0 14px">
            <V s="position:absolute;left:-26px;top:-12px;width:22px;height:22px;border-radius:11px;background:#FF5A1F" />
            <V s="position:absolute;right:-26px;top:-12px;width:22px;height:22px;border-radius:11px;background:#FF5A1F" />
          </V>
          <V s="padding:16px 18px 18px;display:flex;gap:16px;align-items:center">
            <QR cells={vm.qr} s="width:92px;height:92px;flex:none;display:grid;grid-template-columns:repeat(21,1fr);grid-template-rows:repeat(21,1fr)" />
            <V s="display:flex;flex-direction:column;gap:4px">
              <V s="font:700 15px Geist,sans-serif">
                <T>{"Admit 1 \u00b7 "}{vm.on.tier}</T>
              </V>
              <V s="font:400 12.5px/1.4 Geist,sans-serif;color:rgba(21,18,15,.62);text-wrap:pretty">
                <T>{vm.on.charge}</T>
              </V>
            </V>
          </V>
        </V>
        <V s="display:flex;gap:8px">
          <V s="flex:1;height:52px;border-radius:26px;border:0;background:#15120F;color:#F4EFE6;font:600 15px Geist,sans-serif;cursor:pointer" btn>
            <T>{"Add to Wallet"}</T>
          </V>
          <V s="flex:1;height:52px;border-radius:26px;border:2px solid #15120F;background:transparent;color:#15120F;font:600 15px Geist,sans-serif;cursor:pointer" btn onPress={vm.onShareOn}>
            <T>{"Tell the squad"}</T>
          </V>
        </V>
      </V>
      <V s={`position:absolute;inset:0;z-index:94;display:${vm.goingScrim}`} onPress={vm.closeGoing} />
      <V s={`position:absolute;left:10px;right:10px;top:50px;z-index:95;transform:${vm.goingT};opacity:${vm.goingO};pointer-events:${vm.goingPE};transform-origin:top left;transition:transform .45s cubic-bezier(.2,.9,.2,1),opacity .25s`} screen="11 Going">
        <V s="border-radius:26px;background:rgba(255,253,248,.82);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.65);box-shadow:0 18px 40px rgba(60,15,0,.3);padding:14px;display:flex;flex-direction:column;gap:10px">
          <V s="display:flex;justify-content:space-between;align-items:baseline;padding:0 4px">
            <T s="font:800 20px 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em">{"You're going"}</T>
            <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.55)">{vm.goingSub}</T>
          </V>
          {vm.going.map((gg: any, i_gg: number) => (
              <V key={i_gg} s="display:flex;gap:12px;align-items:center;padding:10px;border-radius:18px;border:1px solid rgba(21,18,15,.08);background:#FFFDF8;cursor:pointer;text-align:left;color:#15120F" btn onPress={gg.onTap}>
                <V s={`width:48px;height:52px;flex:none;border-radius:12px;background:${gg.dateBg};color:${gg.dateCol};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px`}>
                  <T s="font:600 9.5px 'Geist Mono',monospace;letter-spacing:.08em">{gg.mon}</T>
                  <T s="font:800 21px/1 'Bricolage Grotesque',sans-serif">{gg.day}</T>
                </V>
                <V s="flex:1;min-width:0">
                  <V s="font:700 15px/1.15 'Bricolage Grotesque',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                    <T>{gg.title}</T>
                  </V>
                  <V s="font:500 12px Geist,sans-serif;color:rgba(21,18,15,.6);margin-top:3px">
                    <T>{gg.meta}</T>
                  </V>
                </V>
                <V s={`flex:none;height:22px;padding:0 8px;border-radius:11px;background:${gg.pillBg};color:${gg.pillCol};font:600 10px/22px 'Geist Mono',monospace;letter-spacing:.06em`} span>
                  <T>{gg.pill}</T>
                </V>
              </V>
          ))}
          {vm.goingEmpty ? (
            <V s="padding:16px;border-radius:18px;border:1.5px dashed rgba(21,18,15,.18);font:500 13.5px/1.4 Geist,sans-serif;color:rgba(21,18,15,.65);text-align:center">
              <T>{"Nothing yet. Swipe right on a plan and it lands here."}</T>
            </V>
          ) : null}
        </V>
      </V>
      <V s={`position:absolute;inset:0;z-index:85;background:radial-gradient(70% 45% at 15% 8%,#FFB38F 0%,rgba(255,179,143,0) 70%),radial-gradient(80% 55% at 90% 55%,#FF7A3D 0%,rgba(255,122,61,0) 70%),radial-gradient(90% 50% at 20% 100%,#E8400C 0%,rgba(232,64,12,0) 70%),#FF5A1F;display:${vm.onbShow};flex-direction:column;padding:62px 22px 34px;box-sizing:border-box`} screen="00 Onboarding">
        <V s="display:flex;gap:6px;flex:none">
          {vm.onb.dots.map((od: any, i_od: number) => (
              <V key={i_od} s={`flex:1;height:4px;border-radius:2px;background:${od};transition:background .3s`} />
          ))}
        </V>
        {vm.onb.s0 ? (
          <>
          <V s="flex:1;display:flex;flex-direction:column;justify-content:center;gap:20px">
            <V s="font:800 108px/.85 'Bricolage Grotesque',sans-serif;letter-spacing:-.065em">
              <T>{"down"}<T s="color:#FFFDF8">{"."}</T></T>
            </V>
            <V s="font:700 27px/1.1 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em;max-width:320px;text-wrap:balance">
              <T>{"Swipe on plans before they exist. Back the ones you want to happen."}</T>
            </V>
            <V s="font:500 15.5px/1.45 Geist,sans-serif;max-width:310px;color:rgba(21,18,15,.8);text-wrap:pretty">
              <T>{"Every plan is somewhere in Boston you haven't been yet, with people you haven't met yet."}</T>
            </V>
          </V>
          <V s="height:58px;border-radius:29px;border:0;background:#15120F;color:#FFFDF8;font:800 18px 'Bricolage Grotesque',sans-serif;cursor:pointer;flex:none" btn onPress={vm.onb.next} active="transform:scale(.97)">
            <T>{"Get started"}</T>
          </V>
          <V s="text-align:center;font:600 14px Geist,sans-serif;margin-top:16px" onPress={vm.onb.skip}>
            <T>{"I already have an account"}</T>
          </V>
          </>
        ) : null}
        {vm.onb.s1 ? (
          <>
          <V s="margin-top:30px;display:flex;flex-direction:column;gap:8px;flex:none">
            <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.7)">{"STEP 1 OF 2"}</T>
            <V s="font:800 40px/1 'Bricolage Grotesque',sans-serif;letter-spacing:-.035em">
              <T>{"What gets you out?"}</T>
            </V>
            <V s="font:500 15px/1.4 Geist,sans-serif;color:rgba(21,18,15,.78)">
              <T>{"Pick three or more. We'll find the neighborhoods that do it best."}</T>
            </V>
          </V>
          <V s="display:flex;flex-wrap:wrap;gap:8px;margin-top:26px;align-content:flex-start;flex:1">
            {vm.onb.vibes.map((vb: any, i_vb: number) => (
                <V key={i_vb} s={`height:48px;padding:0 18px;border-radius:24px;border:1px solid ${vb.border};background:${vb.bg};color:${vb.col};font:600 15px Geist,sans-serif;cursor:pointer;backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);transition:background .2s,color .2s`} btn onPress={vb.onTap}>
                  <T>{vb.t}</T>
                </V>
            ))}
          </V>
          <V s={`height:58px;border-radius:29px;border:0;background:${vm.onb.ctaBg};color:${vm.onb.ctaCol};font:800 18px 'Bricolage Grotesque',sans-serif;cursor:pointer;flex:none;transition:background .2s`} btn onPress={vm.onb.next}>
            <T>{vm.onb.cta}</T>
          </V>
          </>
        ) : null}
        {vm.onb.s2 ? (
          <>
          <V s="margin-top:30px;display:flex;flex-direction:column;gap:8px;flex:none">
            <T s="font:600 10.5px 'Geist Mono',monospace;letter-spacing:.1em;color:rgba(21,18,15,.7)">{"STEP 2 OF 2"}</T>
            <V s="font:800 40px/1 'Bricolage Grotesque',sans-serif;letter-spacing:-.035em">
              <T>{"Try somewhere new."}</T>
            </V>
            <V s="font:500 15px/1.4 Geist,sans-serif;color:rgba(21,18,15,.78)">
              <T>{"Matched to your vibes. You've never backed a plan in any of these."}</T>
            </V>
          </V>
          <V s="display:flex;flex-direction:column;gap:10px;margin-top:22px;flex:1;min-height:0;overflow-y:auto">
            {vm.onb.hoods.map((hd: any, i_hd: number) => (
                <V key={i_hd} s="display:flex;gap:12px;align-items:center;padding:14px 16px;border-radius:22px;background:rgba(255,253,248,.66);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.6);cursor:pointer;text-align:left;color:#15120F" btn onPress={hd.onTap}>
                  <V s="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px">
                    <T s="font:800 21px/1.1 'Bricolage Grotesque',sans-serif;letter-spacing:-.02em">{hd.n}</T>
                    <T s="font:500 13.5px Geist,sans-serif;color:rgba(21,18,15,.72)">{hd.why}</T>
                    <V s="font:600 10px 'Geist Mono',monospace;letter-spacing:.08em;color:#C2410C;margin-top:3px" span>
                      <T>{hd.meta}</T>
                    </V>
                  </V>
                  <V s={`width:30px;height:30px;flex:none;border-radius:15px;background:${hd.chk};border:1.5px solid rgba(21,18,15,.2);display:flex;align-items:center;justify-content:center`}>
                    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={hd.chkCol} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <Path d="m5 12.5 4.5 4.5L19 7.5" />
                    </Svg>
                  </V>
                </V>
            ))}
          </V>
          <V s="height:58px;border-radius:29px;border:0;background:#15120F;color:#FFFDF8;font:800 18px 'Bricolage Grotesque',sans-serif;cursor:pointer;flex:none;margin-top:14px" btn onPress={vm.onb.next} active="transform:scale(.97)">
            <T>{vm.onb.cta}</T>
          </V>
          </>
        ) : null}
      </V>
      <LockScreen s={`position:absolute;inset:0;z-index:89;display:${vm.lockShow};flex-direction:column;align-items:center;padding:64px 12px 12px;box-sizing:border-box;background:radial-gradient(80% 50% at 25% 8%,#FFB38F 0%,rgba(255,179,143,0) 70%),radial-gradient(90% 60% at 85% 95%,#8A2600 0%,rgba(138,38,0,0) 70%),#E8501A;color:#15120F`} onUnlock={vm.unlock} screen="00 Lock screen">
        <Svg width="16" height="18" viewBox="0 0 24 26" fill="none" stroke="currentColor" strokeWidth="2.4">
          <Rect x="4" y="11" width="16" height="13" rx="3" />
          <Path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </Svg>
        <V s="font:600 19px Geist,sans-serif;margin-top:10px">
          <T>{"Monday, November 2"}</T>
        </V>
        <V s="font:700 98px/1 'Bricolage Grotesque',sans-serif;letter-spacing:-.04em;margin-top:2px">
          <T>{"9:41"}</T>
        </V>
        <V s="margin-top:auto;width:100%;display:flex;flex-direction:column;gap:8px">
          {vm.lockNotifs.map((ln: any, i_ln: number) => (
              <V key={i_ln} s={`display:flex;gap:12px;align-items:center;padding:12px 14px;border-radius:24px;background:rgba(255,253,248,.42);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border:1px solid rgba(255,255,255,.5);text-align:left;cursor:pointer;color:#15120F;opacity:${ln.op};transform:scale(${ln.sc});transform-origin:top center`} btn onPress={ln.onTap}>
                <V s="width:38px;height:38px;flex:none;border-radius:10px;background:#15120F;color:#FF5A1F;display:flex;align-items:center;justify-content:center;font:800 16px 'Bricolage Grotesque',sans-serif;letter-spacing:-.04em">
                  <T>{"d."}</T>
                </V>
                <V s="flex:1;min-width:0">
                  <V s="display:flex;justify-content:space-between">
                    <T s="font:700 14.5px Geist,sans-serif">{ln.t}</T>
                    <T s="font:500 12px Geist,sans-serif;color:rgba(21,18,15,.6)">{ln.time}</T>
                  </V>
                  <V s="font:400 13.5px/1.35 Geist,sans-serif;color:rgba(21,18,15,.8);margin-top:1px">
                    <T>{ln.s}</T>
                  </V>
                </V>
              </V>
          ))}
          <V s="border:0;background:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:12px;padding:18px 0 4px;color:#15120F" btn onPress={vm.unlock}>
            <T s="font:600 13px Geist,sans-serif">{"Swipe up to open"}</T>
            <V s="width:134px;height:5px;border-radius:3px;background:#15120F" />
          </V>
        </V>
      </LockScreen>
    </Root>
  );
}
