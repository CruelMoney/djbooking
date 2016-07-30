
const formatter = {
  date:{
          ToEU: function (inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s }
            var d = new Date(inputFormat)
            return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
          },

          ToUS: function (inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s }
            var d = new Date(inputFormat)
            return [pad(d.getMonth()+1), pad(d.getDate()), d.getFullYear()].join('/')
          }
        }
}

export default formatter
