// type NumberOrString = number | string

// let num: NumberOrString = 5
// num = 10
// num = 'hello'
// // num = true
// console.log(num)

// ТИПИЗАЦИЯ ОБЬЕКТА

// type Student = {
//     name: string
//     isStudying: boolean
//     speciality: string
// }

// type Speciality = 'Frontend' | 'Backend' | 'UX/UI Designer' | 'Devops'

// interface Student {
//     name: string
//     isStudying: boolean
//     speciality: Speciality
//     age?: number // опциональное
//     showInfo: () => undefined
// }

// const student1: Student = {
//     name: 'Adiya',
//     isStudying: true,
//     speciality: 'Frontend',
//     showInfo: function() {
//         console.log(`Name: ${this.name}, Speciality: ${this.speciality}`)
//     }
// }

// const student2: Student = {
//     name: 'Dauren',
//     isStudying: true,
//     speciality: 'Backend',
//     age: 21,
//     showInfo: function() {
//         console.log(`Name: ${this.name}, Speciality: ${this.speciality}`)
//     }
// }

// const student3: Student = {
//     name: 'Konstantin',
//     isStudying: true,
//     speciality: 'Devops',
//     age: 23,
//     showInfo: function() {
//         console.log(`Name: ${this.name}, Speciality: ${this.speciality}`)
//     }
// }

// student1.showInfo()
// student2.showInfo()

// ТИПИЗАЦИЯ ФУНКЦИИ

// function sum(num1: number, num2: number): number {
//     return num1 + num2
// }

// const sum: () => number = (num1: number, num2: number) => {
//     return num1 + num2
// }

// sum(1, 2)

// GENERICS - Дженерики

// interface PC<R> {
//     model: string
//     gpu: string
//     cpu: string
//     ram: R // ram: number
// }

// const pc1: PC<string> = {
//     model: 'Light PC',
//     gpu: '4070',
//     cpu: 'AMD',
//     ram: "32gb"
// }

// const pc2: PC<number> = {
//     model: 'Dark PC',
//     gpu: '4060',
//     cpu: 'Intel',
//     ram: 32
// }

// const pc3: PC<boolean> = {
//     model: 'Dark PC',
//     gpu: '4060',
//     cpu: 'Intel',
//     ram: false
// }