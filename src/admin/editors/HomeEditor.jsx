import { Field, TextReq, Select, KeySelect, ListSection } from '../fields'
import ImagePicker from '../ImagePicker'
import { COLORS, COLORS_NO_PINK } from '../constants'

export default function HomeEditor({ data, setData }) {
  return (
    <>
      <section className="ad-section">
        <div className="ad-section-head">
          <h3>頭像</h3>
        </div>
        <p className="ad-note">
          網站上只顯示 64×64。上傳什麼尺寸都會被壓到 1600px 以內並轉成 WebP，手機拍的照片可以直接丟。
        </p>
        <ImagePicker value={data.avatar} onChange={v => setData({ ...data, avatar: v })} />
      </section>

      <ListSection
        title="數據列"
        addLabel="+ 新增數據"
        hint="標籤文字存在 translations.js，所以只能從既有的 stat.* 挑。"
        list={data.stats}
        setList={v => setData({ ...data, stats: v })}
        blank={() => ({ value: '', labelKey: 'stat.years', color: 'cyan' })}
        compact
      >
        {(s, i, ops) => (
          <div className="ad-crow-grid">
            <Field label="數字">
              <TextReq value={s.value} onChange={v => ops.update(i, { value: v })} />
            </Field>
            <Field label="標籤">
              <KeySelect
                value={s.labelKey}
                onChange={v => ops.update(i, { labelKey: v })}
                match={/^stat\./}
              />
            </Field>
            <Field label="配色" hint="數據列樣式沒有 pink">
              <Select value={s.color} onChange={v => ops.update(i, { color: v })} options={COLORS_NO_PINK} />
            </Field>
          </div>
        )}
      </ListSection>

      <ListSection
        title="技術跑馬燈"
        addLabel="+ 新增技術"
        hint="首頁底部橫向滾動的標籤。順序就是顯示順序，清單會自動接成無縫循環。"
        list={data.ticker}
        setList={v => setData({ ...data, ticker: v })}
        blank={() => ({ label: '', color: 'cyan' })}
        compact
      >
        {(t, i, ops) => (
          <div className="ad-crow-grid">
            <Field label="名稱">
              <TextReq value={t.label} onChange={v => ops.update(i, { label: v })} />
            </Field>
            <Field label="配色">
              <Select value={t.color} onChange={v => ops.update(i, { color: v })} options={COLORS} />
            </Field>
          </div>
        )}
      </ListSection>

      <ListSection
        title="終端機視窗"
        addLabel="+ 新增一行"
        hint="首頁右側 neofetch 風格的那幾行。左欄名稱不重複、不留空 —— 它同時是 React key。"
        list={data.terminal}
        setList={v => setData({ ...data, terminal: v })}
        blank={() => ({ key: '', value: '' })}
        compact
      >
        {(row, i, ops) => (
          <div className="ad-crow-grid">
            <Field label="左欄名稱">
              <TextReq value={row.key} onChange={v => ops.update(i, { key: v })} />
            </Field>
            <Field label="右欄內容">
              <TextReq value={row.value} onChange={v => ops.update(i, { value: v })} />
            </Field>
          </div>
        )}
      </ListSection>

      <section className="ad-section">
        <div className="ad-section-head">
          <h3>寶可夢</h3>
        </div>
        <p className="ad-note">
          只有 pokemon 主題會渲染這一區，而主題目前鎖在 cyber（見 <code>src/context/ThemeContext.jsx</code>），
          所以這些資料現在不會出現在網站上。儲存時會原樣保留，要編輯請切到上方的 JSON 模式。
        </p>
      </section>
    </>
  )
}
