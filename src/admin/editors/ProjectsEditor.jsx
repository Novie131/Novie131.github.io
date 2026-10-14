import { Field, Text, Area, Lines, Check, Bilingual, ListSection } from '../fields'
import ImagePicker from '../ImagePicker'
import { uid } from '../util'

const blank = () => ({
  id: uid('project'),
  slug: '',
  title: '',
  category: '',
  featured: false,
  description: { zh: '', en: '' },
  features: { zh: [], en: [] },
  tech: [],
  repoLink: '',
  demoLink: null,
  image: null,
})

export default function ProjectsEditor({ data, setData }) {
  return (
    <>
      <div className="ad-toolbar">
        <Field label="篩選分類" hint="逗號分隔，第一個必須是 All">
          <Text
            value={data.filters.join(', ')}
            onChange={v => setData({
              ...data,
              filters: String(v ?? '').split(',').map(s => s.trim()).filter(Boolean),
            })}
          />
        </Field>
      </div>

      <ListSection
        title="作品"
        list={data.items}
        setList={v => setData({ ...data, items: v })}
        blank={blank}
        addLabel="+ 新增作品"
        rowTitle={p => p.title || '（未命名）'}
      >
        {(p, i, ops) => (
          <>
            <div className="ad-grid-2">
              <Field label="標題">
                <Text value={p.title} onChange={v => ops.update(i, { title: v })} />
              </Field>
              <Field label="slug" hint="卡片標題列顯示的路徑">
                <Text value={p.slug} onChange={v => ops.update(i, { slug: v })} />
              </Field>
              <Field label="分類" hint="需能被篩選字串命中，例如 AI / Bot">
                <Text value={p.category} onChange={v => ops.update(i, { category: v })} />
              </Field>
              <Field label="精選">
                <Check value={p.featured} onChange={v => ops.update(i, { featured: v })} />
              </Field>
              <Field label="GitHub 連結" hint="留空則不顯示按鈕">
                <Text value={p.repoLink} onChange={v => ops.update(i, { repoLink: v })} />
              </Field>
              <Field label="Demo 連結" hint="留空則不顯示按鈕">
                <Text value={p.demoLink} onChange={v => ops.update(i, { demoLink: v })} />
              </Field>
            </div>

            <Bilingual
              label="描述"
              value={p.description}
              onChange={v => ops.update(i, { description: v })}
              render={(val, set) => <Area value={val} onChange={set} />}
            />

            <Bilingual
              label="功能重點（一行一項）"
              value={p.features}
              onChange={v => ops.update(i, { features: v })}
              render={(val, set) => <Lines value={val} onChange={set} rows={5} />}
            />

            <Field label="技術標籤（一行一項）">
              <Lines value={p.tech} onChange={v => ops.update(i, { tech: v })} />
            </Field>

            <Field label="封面圖" hint="留空則卡片不顯示圖片">
              <ImagePicker value={p.image} onChange={v => ops.update(i, { image: v })} />
            </Field>
          </>
        )}
      </ListSection>
    </>
  )
}
