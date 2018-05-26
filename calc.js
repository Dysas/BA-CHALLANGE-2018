$(document).ready(function () {

    $("input").keyup(function () {

        //Data
        var loanVal = $(".loan").val();
        var interestRate = $('.interestRate').val();
        var period = $('.period').val();
        var date = new Date($('.date').val());

        var total = 0; //For last result calculation

        // Start calculation
        if (date) {

            $('tbody').html('');

            for (let i = 1; i <= period; i++) {

                if (i > 1)
                    var loanVal = Math.round((Number($('.loanVal' + (i - 1)).html()) - Number($('.principalPay' + (i - 1)).html())) * 100) / 100;

                var answ = calculate(loanVal, interestRate, period, i);
                total += Number(answ.PrincipalPayment);

                if (i == period) {
                    answ.PrincipalPayment = Math.round((answ.PrincipalPayment + Number($('.loanVal1').html()) - total)* 100) / 100;
                    answ.TotalPayment = (answ.TotalPayment + Number($('.loanVal1').html()) - total).toFixed(2);
                }

                var calc = `<tr>
                                <td>`+ i + `</td>
                                <td>`+ getDate(date) + `</td>
                                <td class="loanVal`+ i + `">` + loanVal + `</td>
                                <td class="principalPay`+ i + `">` + answ.PrincipalPayment + `</td>
                                <td class="interestPay`+ i + `">` + answ.InterestPayment + `</td>
                                <td class="totalPay`+ i + `">` + answ.TotalPayment + `</td>
                                <td>`+ interestRate + `</td>
                            </tr>`;

                $('tbody').append(calc);
                incMonth(date, 1);
            }
        }
    });

    //table to CSV
    $("#export").click(function () {
        $("table").tableToCSV();
    });

    // Calculate
    function calculate(loanVal, interestRate, period, index) {
        var answ = {};

        //  Month interest rate
        answ.MonthInterestRate = interestRate / 1200;
        if (interestRate == 0)
            answ.MonthInterestRate = 0;

        //  Interest payment
        answ.InterestPayment = (answ.MonthInterestRate * loanVal).toFixed(2);

        //  Total payement
        answ.TotalPayment = Number($('.totalPay' + (index - 1)).html());
        if (index === 1)
            answ.TotalPayment = Math.floor(loanVal * (answ.MonthInterestRate * Math.pow(1 + answ.MonthInterestRate, period)) / (Math.pow(1 + answ.MonthInterestRate, period) - 1) * 100) / 100;

        // Principal Payemnt
        answ.PrincipalPayment = Math.round((answ.TotalPayment - answ.InterestPayment) * 100) / 100;

        return answ;
    }

    function incMonth(date, value) {
        date.setMonth(date.getMonth() + value);
    }

    function getDate(date) {
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
    }
});
