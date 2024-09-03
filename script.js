const scrn = document.querySelector('#screen');
//numbers
const num = document.querySelectorAll(".num");
//managing
const man = document.querySelectorAll('.man')
//basic
const basic = document.querySelectorAll('.basic');
//advanced
const extra = document.querySelectorAll('.extra')

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const symbols = ['+', '*', '/', '^'];
let n1, n2;
let sym = '-1';


num.forEach(n => 
{
    n.addEventListener("click",event => 
    {
        let input = scrn.innerHTML;
        input = checkUselessZero(input);
        scrn.innerHTML = input + event.target.value;
    });
});

function checkUselessZero(line)
{
    if(line.length == 1 && line[0] == '0')
    {
        return '';
    }
    else if(line.length == 2 && line == '-0')
    {
        return '-'
    }
    else(checkForSymbol(line.substring(1, line.length), symbols + '-'))
    {
        let temp1 = line;
        let temp2 = line.substring(1, line.length)
        for(let i = 0; i < temp2.length; i++)
        {
            if((symbols + '-').includes(temp2[i]))
            {
                //console.log(line.indexOf(temp2[i]));
                temp1 = line.substring(0, line.indexOf(temp2[i]) + 1)
                temp2 = line.substring(line.indexOf(temp2[i]) + 1, line.length)
                break;
            }
        }
        if(temp2 == '0')
        {
            return temp1;
        }
    }
    return line;
}

//managing
man.forEach(m => 
{
    m.addEventListener("click",event => 
    {
        // (AC)
        if(event.target.value == 'ac')
        {
            scrn.innerHTML = '0';
        }
        // (C)
        if(event.target.value == 'c')
        {
            let input = scrn.innerHTML;
            if(input.length>1)
            {
                scrn.innerHTML = input.substring(0,input.length-1);
            }
            else
            {
                scrn.innerHTML = '0';
            }
        }
        // (=)
        if(event.target.value == '=')
        {
            let input = scrn.innerHTML;
            //console.log(sym);
            n2 = Number(input.substring(input.indexOf(sym) + 1, input.length));
            if((symbols + '-' + '.').includes(input[input.length - 1]))
            {
                alert('You cant write multiple symbols');   
            }
            else
            {
                if(sym == '-1')
                {
                    output = roundNumber(input);
                }
                if(sym == '+')
                {
                    output = roundNumber(n1 + n2);

                }
                if(sym == '-')
                {
                    if(input[0] == '-')
                    {
                        let temp = input.substring(1, input.length + 1);
                        n2 = Number(temp.substring(temp.indexOf('-'), temp.length));
                    }
                    output = roundNumber(n1 - n2);
                }
                if(sym == '*')
                {
                    output = n1 * n2;
                }
                if(sym == '/')
                {
                    if(n2 === 0)
                    {
                        output = 'undefined';
                    }
                    else
                    {
                        output = roundNumber(n1 / n2);
                    }
                }
                if(sym == '^')
                {
                    output = roundNumber(Math.pow(n1, n2))
                }
                if(sym == '√')
                {
                    n2 = 1 / Number(input.substring(input.indexOf('/') + 1, input.length));
                    //console.log(input.substring(input.indexOf('/') + 1, input.length));
                    //console.log(n2);
                    if(n2 === 0)
                    {
                        output = 'undefined';
                    }
                    else
                    {
                        console.log(Math.pow(n1 , n2));
                        output = roundNumber(Math.pow(n1 , n2));
                    }
                }
                //console.log(n1 + ' ' +  sym + ' ' + n2);
                //console.log(output);
                scrn.innerHTML = output;
            }
        }
    });
});

//basic
basic.forEach(b => 
{
    b.addEventListener("click",event => 
    {
        // (-)
        if(event.target.value == '-')
        {
            let input = scrn.innerHTML;
            if(input == '0')
            {
                //console.log('1');
                scrn.innerHTML = '-0';
            }
            else if(numbers.includes(input) || (input.length > 1 && checkForSymbol(input.substring(1, input.length), symbols + '-') && input[input.length - 1] != '.'))
            {
                //console.log('2');
                sym = '-';
                n1 = Number(input);
                scrn.innerHTML = input + '-';
            }
            else if(symbols.includes(input[input.length - 1]))
            {
                //console.log(symbols.includes(input[input.length - 1]))
                //console.log('3');
                scrn.innerHTML = input + '-';
            }
            else
            {
                alert('You cant write multiple symbols');
            }
        }
        // (+) (*) (/)
        if(symbols.includes(event.target.value))
        {
            let input = scrn.innerHTML;
            if(!checkForSymbol(input, symbols) || ('.' + '-').includes(input[input.length - 1]))
            {
                alert("You cant write multiple symbols");
            }
            else
            {
                n1 = Number(input);
                sym = event.target.value;
                scrn.innerHTML = input + event.target.value;
            }
        }
        // (%)
        if(event.target.value == '%')
        {
            let input = scrn.innerHTML;
            if(checkForSymbol(input.substring(1, input.length), ['+', '*', '/', '-']) && input[input.length - 1] != '.')
            {
                //console.log(input);
                let output = roundNumber(input / 100);
                //console.log(output);
                scrn.innerHTML=output;
            }
            else
            {
                alert("You cant get percatange with this value");
            }
        }
        // (.)
        if(event.target.value == '.')
        {
            let input = scrn.innerHTML;
            let temp = input;
            if(input.length > 1 && !checkForSymbol(temp.substring(1, input.length), (symbols + '-')))
            {
                temp = temp.substring(1,  temp.length);
                for(let i = 0; i < temp.length; i++)
                {
                    console.log(temp[i]);
                    if((symbols + '-').includes(temp[i]))
                    {
                        temp = temp.substring(i + 1, temp.length);
                        break;
                    }
                }
            }
            //console.log('value to check ' + temp);
            if(temp.includes('.') && temp.length > 0)
            {
                alert("You cant have two decimal points");
            }
            else if(temp.length == 0 || temp == '-')
            {
                alert("You cant have decimal point here");
            }
            else
            {
                scrn.innerHTML = input + '.';
            }    
        }
    });
});

extra.forEach(e => 
{
    e.addEventListener("click",event => 
    {
        // (RAD)
        if(event.target.value == 'rad')
        {
            let input = scrn.innerHTML;
            if(checkForSymbol(input, symbols) && input[input.length - 1] != '.' && !input.substring(1, input.length).includes('-'))
            {
                /*console.log(!checkForSymbol(input, symbols));
                console.log(input[input.length - 1] != '.');
                console.log(!input.substring(1, input.length).includes('-'));*/
                scrn.innerHTML = roundNumber(input * Math.PI / 180) + ' rad';
            }
            else
            {
                alert("You cant convert this value to radiants");
            }
        }
        // (SIN)
        if(event.target.value == 'sin')
        {
            let input = scrn.innerHTML;
            if(input.substring(input.length - 3, input.length) == 'rad')
            {
                //console.log(input);
                input = input.substring(0, input.length - 3)
                //console.log(input);
                //console.log(Math.round(Math.sin(input)));*/
                scrn.innerHTML = roundNumber(Math.sin(input));
            }
            else
            {
                alert("You can only use sine with radiants");
            }
        }
        // (COS)
        if(event.target.value == 'cos')
        {
            let input = scrn.innerHTML;
            if(input.substring(input.length - 3, input.length) == 'rad')
            {
                //console.log(input);
                input = input.substring(0, input.length - 3)
                //console.log(input);
                //console.log(Math.round(Math.sin(input)));*/
                scrn.innerHTML = roundNumber(Math.cos(input));
            }
            else
            {
                alert("You can only calculate cosine with radiants");
            }
        }
        // (TAN)
        if(event.target.value == 'tan')
        {
            let input = scrn.innerHTML;
            if(input.substring(input.length - 3, input.length) == 'rad')
            {
                //console.log(input);
                input = input.substring(0, input.length - 3)
                //console.log(input);
                //console.log(Math.round(Math.sin(input)));*/
                scrn.innerHTML = roundNumber(Math.tan(input));
            }
            else
            {
                alert("You can only calculate tangent with radiants");
            }
        }
        // (X^Y)
        if(event.target.value == 'x^y')
        {
            let input = scrn.innerHTML;
            if(checkForSymbol(input, symbols) && input[input.length - 1] != '.' && !input.substring(1, input.length).includes('-'))
            {
                n1 = Number(input);
                sym = '^';
                //console.log(n1);
                scrn.innerHTML = input + '^';
            }
            else
            {
                alert("You cant write multiple symbols");
            }
        }
        // (√x)
        if(event.target.value == 'sqrt')
        {
            let input = scrn.innerHTML;
            if(checkForSymbol(input, symbols) && input[input.length - 1] != '.' && !input.substring(1, input.length).includes('-'))
            {
                //console.log(Math.sqrt(input));
                scrn.innerHTML = roundNumber(Math.sqrt(input, 0,5));
            }
            else
            {
                alert("You cant get square root of this value");
            }
        }
        // (n√x)
        if(event.target.value == 'root')
        {
            let input = scrn.innerHTML;
            if(checkForSymbol(input, symbols) && input[input.length - 1] != '.' && !input.substring(1, input.length).includes('-'))
            {
                n1 = Number(input);
                sym = '√'
                scrn.innerHTML = input + '^1/';
            }
        }
        // (N!)
        if(event.target.value == 'fact')
        {
            let input = scrn.innerHTML;
            if(checkForSymbol(input, symbols) && input[input.length - 1] != '.' && !input.substring(1, input.length).includes('-'))
            {
                /*if(input[0] == '-')
                {
                    input = input.substring(1, input.length);
                    //console.log(input);
                    negative = true;
                }
                if(input == '0')
                {
                    scrn.innerHTML = '1'
                }
                else if(input.includes('.'))
                {
                    input = Number(input);
                    //console.log(getGamma(input + 1));
                    input =  roundNumber(getGamma(input + 1))
                    if(negative)
                    {
                        input = '-' + input;
                    }
                    scrn.innerHTML = input;
                }
                else
                {
                    let sum = 1;
                    for(let i = input; i > 0; i--)
                    {
                        console.log(i);
                        console.log(sum);
                        sum = sum * i;
                    }
                    if(negative)
                    {
                        sum = '-' + sum;
                    }
                    scrn.innerHTML = sum;
                }*/
                if(input == '0')
                {
                    scrn.innerHTML = '1'
                }
                else if(input < 0)
                {
                    alert("You cant get factorial from  negative number");
                }
                else if(input.includes('.'))
                {
                    alert("You can only get factorial from whole numbers")
                }
                else
                {
                    let sum = 1;
                    for(let i = input; i > 0; i--)
                    {
                        //console.log(i);
                        //console.log(sum);
                        sum = sum * i;
                    }
                    scrn.innerHTML = roundNumber(sum);
                }
            }
            else
            {
                alert("You cant get factorial of this value");
            }
        }
        // (1/x)
        if(event.target.value == 'inv')
        {
            let input = scrn.innerHTML;
            if(checkForSymbol(input, symbols) && input[input.length - 1] != '.' && !input.substring(1, input.length).includes('-'))
            {
                if(input == '0')
                {
                    scrn.innerHTML = 'undefined';
                }
                else
                {
                    scrn.innerHTML = roundNumber(1 / input);
                }
            }
            else
            {
                alert("You cant get inverse of this value");
            }
        }
        // (PI)
        if(event.target.value == 'pi')
        {
            let input = scrn.innerHTML;
            if(checkForSymbol(input, symbols) && input[input.length - 1] != '.' && !input.substring(1, input.length).includes('-'))
            {
                if(input == '0')
                {
                    scrn.innerHTML = roundNumber(Math.PI);
                }
                else
                {
                    scrn.innerHTML = roundNumber(input * Math.PI);
                }
            }
            else
            {
                alert("You cant get PI of this value");
            }
        }
        // (LG)
        if(event.target.value == 'lg')
        {
            let input = scrn.innerHTML;
            if(checkForSymbol(input, symbols) && input[input.length - 1] != '.' && !input.substring(1, input.length).includes('-'))
            {
                if(input > 0)
                {
                    scrn.innerHTML = roundNumber(Math.log10(input));
                }
                else
                {
                    alert("Cant calculate logarithm of base 10 with zero or negative value");
                }
            }
            else
            {
                alert("You cant calculate logarithm of base 10 with value");
            }
        }
        // (LN)
        if(event.target.value == 'ln')
        {
            let input = scrn.innerHTML;
            if(checkForSymbol(input, symbols) && input[input.length - 1] != '.' && !input.substring(1, input.length).includes('-'))
            {
                if(input > 0)
                {
                    scrn.innerHTML = roundNumber(Math.log(input));
                }
                else
                {
                    alert("Cant calculate natural lagorithm with zero or negative value");
                }
            }
            else
            {
                alert("You cant calculate natural lagorithm with value");
            }
        }
    });
});   

//checks if given symbols are in given line
function checkForSymbol(line, symbols)
{
    for(let i = 0; i<symbols.length; i++)
    {
        if(line.includes(symbols[i]))
        {         
            return false;
        }
    }
    return true;
}

//Method rounds numbers in case they are incorrect due to floating point numbers
function roundNumber(number)
{
    return Math.round(number * (10 ** 10)) / 10 ** 10
}

//Method returns factorial value using gamma function
/*function getGamma(z) 
{
    return Math.sqrt(2 * Math.PI / z) * Math.pow((1 / Math.E) * (z + 1 / (12 * z - 1 / (10 * z))), z);
}*/

