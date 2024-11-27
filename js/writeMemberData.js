// 各学年のデータを書き込む
const writeMemberData = async (grade) => {
    document.getElementById("members").innerHTML += `
      <table summary="サークルのメンバーの紹介" class="intro-table">
          <caption>
          ${grade}回生
          </caption>
          <tbody id="student-${grade}">
          </tbody>
      </table>
    `

    const student = document.getElementById(`student-${grade}`)

    // 現在の1年生が何期生か?
    const currentGrade1 = getFiscalYear() - 2021

    const members = await safeLoadCsvAsObjects(`memberdata/student-${currentGrade1 - grade + 1}.csv`)

    members.forEach((member) => {
        student.innerHTML += `
            <tr>
                <th class="name">${member.name}</th>
                <td class="course">${member.course}</td>
                <td class="detail">
                    趣味: ${member.hobby}<br>
                    一言: ${member.comment}
                </td>
            </tr>
        `
    })
}

const writeOb = async (term) => {
    const student = document.getElementById(`student-ob-og`)

    const members = await safeLoadCsvAsObjects(`memberdata/student-${term}.csv`)

    members.forEach((member) => {
        student.innerHTML += `
            <tr>
                <th class="name">${member.name}</th>
                <td class="course">${member.course}</td>
                <td class="detail">
                    趣味: ${member.hobby}<br>
                    一言: ${member.comment}
                </td>
            </tr>
        `
    })
}

const writeMoreBefore = async () => {
    const student = document.getElementById(`student-ob-og`)

    const members = await safeLoadCsvAsObjects(`memberdata/student-それ以前.csv`)

    members.forEach((member) => {
        student.innerHTML += `
            <tr>
                <th class="name">${member.name}</th>
                <td class="course">${member.course}</td>
                <td class="detail">
                    趣味: ${member.hobby}<br>
                    一言: ${member.comment}
                </td>
            </tr>
        `
    })
}

const getFiscalYear = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1 // getMonth() は 0 から 11 の範囲なので +1

    // 日本の年度（4月〜翌年3月）
    return month >= 4 ? year : year - 1
}

const writeAllMemberData = async () => {
    for (let i = 0; i < 4; i++) {
        await writeMemberData(i + 1)
    }

    document.getElementById("members").innerHTML += `
    <table summary="サークルのメンバーの紹介" class="intro-table">
        <caption>
        OB-OG
        </caption>
        <tbody id="student-ob-og">
        </tbody>
    </table>
  `

    for (let i = 0; i < getFiscalYear() - 2024; i++) {
        console.log(getFiscalYear() - 2024 - i)
        await writeOb(getFiscalYear() - 2024 - i)
    }

    await writeMoreBefore()
}
