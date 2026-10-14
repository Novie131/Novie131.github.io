import { Field, Text, Select, ListSection } from '../fields'
import { COLORS } from '../constants'
import { uid } from '../util'

/* 三個區塊結構相同，差別只在欄位清單 —— 用描述表驅動，不用寫三次一樣的 JSX */
const SECTIONS = [
  {
    key: 'certifications',
    title: '專業認證',
    addLabel: '+ 新增認證',
    blank: () => ({
      id: uid('cert'), title: '', issuer: '', date: '',
      credentialId: null, link: null, tag: '', color: 'cyan',
    }),
    fields: [
      { key: 'title', label: '名稱' },
      { key: 'issuer', label: '發證單位' },
      { key: 'date', label: '年份' },
      { key: 'tag', label: '標籤', hint: '卡片角落的小字' },
      { key: 'credentialId', label: 'Credential ID', hint: '留空則不顯示' },
      { key: 'link', label: '驗證連結', hint: '留空則不顯示驗證按鈕' },
      { key: 'color', label: '配色', type: 'color' },
    ],
  },
  {
    key: 'competitions',
    title: '競賽',
    addLabel: '+ 新增競賽',
    blank: () => ({
      id: uid('comp'), title: '', event: '', organizer: '', date: '',
      award: '', description: '', link: null, color: 'pink',
    }),
    fields: [
      { key: 'title', label: '競賽名稱' },
      { key: 'event', label: '賽事場次' },
      { key: 'organizer', label: '主辦單位' },
      { key: 'date', label: '年份' },
      { key: 'award', label: '獎項' },
      { key: 'description', label: '說明', hint: '可留空' },
      { key: 'link', label: '連結', hint: '可留空' },
      { key: 'color', label: '配色', type: 'color' },
    ],
  },
  {
    key: 'courses',
    title: '課程',
    addLabel: '+ 新增課程',
    blank: () => ({
      id: uid('course'), title: '', issuer: '', date: '',
      modules: '', link: null, color: 'cyan',
    }),
    fields: [
      { key: 'title', label: '課程名稱' },
      { key: 'issuer', label: '開課單位' },
      { key: 'date', label: '年份' },
      { key: 'modules', label: '規模', hint: '例如 5 courses' },
      { key: 'link', label: '連結', hint: '可留空' },
      { key: 'color', label: '配色', type: 'color' },
    ],
  },
  {
    key: 'events',
    title: '參與的技術活動',
    addLabel: '+ 新增活動',
    blank: () => ({ id: uid('event'), name: '', date: '' }),
    titleKey: 'name',
    fields: [
      { key: 'name', label: '活動名稱' },
      { key: 'date', label: '日期', hint: '可留空' },
    ],
  },
]

export default function ResumeEditor({ data, setData }) {
  return (
    <>
      <p className="ad-note">
        學歷、產學合作、論文、社群與技術寫作含中英雙語與條列欄位，請切到上方「JSON」模式編輯。
      </p>
      {SECTIONS.map(section => (
        <ListSection
          key={section.key}
          title={section.title}
          addLabel={section.addLabel}
          list={data[section.key] ?? []}
          setList={v => setData({ ...data, [section.key]: v })}
          blank={section.blank}
          rowTitle={item => item[section.titleKey ?? 'title'] || '（未命名）'}
        >
          {(item, i, ops) => (
            <div className="ad-grid-2">
              {section.fields.map(f => (
                <Field key={f.key} label={f.label} hint={f.hint}>
                  {f.type === 'color'
                    ? <Select
                        value={item[f.key]}
                        onChange={v => ops.update(i, { [f.key]: v })}
                        options={COLORS}
                      />
                    : <Text
                        value={item[f.key]}
                        onChange={v => ops.update(i, { [f.key]: v })}
                      />}
                </Field>
              ))}
            </div>
          )}
        </ListSection>
      ))}
    </>
  )
}
