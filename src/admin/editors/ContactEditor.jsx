import { Field, Text, Select, KeySelect, ListSection } from '../fields'
import { COLORS_NO_PINK } from '../constants'
import { uid } from '../util'

export default function ContactEditor({ data, setData }) {
  return (
    <>
      <ListSection
        title="聯絡方式"
        addLabel="+ 新增聯絡方式"
        hint="href 留空的話卡片還是會顯示，只是不可點擊。開頭是 http 的會自動用新分頁開啟。"
        list={data.links}
        setList={v => setData({ ...data, links: v })}
        blank={() => ({
          id: uid('link'), label: '', value: '', href: '', icon: '◉', color: 'cyan',
        })}
        rowTitle={l => l.label || '（未命名）'}
      >
        {(l, i, ops) => (
          <div className="ad-grid-2">
            <Field label="標籤" hint="卡片上的小標，例如 Email">
              <Text value={l.label} onChange={v => ops.update(i, { label: v })} />
            </Field>
            <Field label="顯示文字" hint="卡片上實際看到的內容">
              <Text value={l.value} onChange={v => ops.update(i, { value: v })} />
            </Field>
            <Field label="連結" hint="mailto: 或 https://；留空則不可點">
              <Text value={l.href} onChange={v => ops.update(i, { href: v })} />
            </Field>
            <Field label="圖示" hint="單一符號，例如 ✉ ⌥ ⊕ ◉">
              <Text value={l.icon} onChange={v => ops.update(i, { icon: v })} />
            </Field>
            <Field label="配色">
              <Select value={l.color} onChange={v => ops.update(i, { color: v })} options={COLORS_NO_PINK} />
            </Field>
          </div>
        )}
      </ListSection>

      <ListSection
        title="open_to（合作意向）"
        addLabel="+ 新增一項"
        hint="這一區的文字存在 translations.js，所以只能從既有的 open.* 挑。要新增選項得先去 src/i18n/translations.js 加 key。"
        list={data.openToKeys}
        setList={v => setData({ ...data, openToKeys: v })}
        blank={() => 'open.fulltime'}
        compact
      >
        {(key, i, ops) => (
          <KeySelect
            value={key}
            onChange={v => ops.replace(i, v)}
            match={/^open\./}
          />
        )}
      </ListSection>
    </>
  )
}
