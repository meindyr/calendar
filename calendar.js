function calendar(){
	return {
		stage : 'calendar',
		date : null,
		time : null,
		location : null,
		today: {},
		weekdays: {
			1: {short : 'Lu', long : 'Lunes'},
			2: {short : 'Ma', long : 'Martes'},
			3: {short : 'Mi', long : 'Miércoles'},
			4: {short : 'Ju', long : 'Jueves'},
			5: {short : 'Vi', long : 'Viernes'},
			6: {short : 'Sa', long : 'Sábado'},
			7: {short : 'Do', long : 'Domingo'}
		},
		months: {
			01 : "Enero",
			02 : "Febrero",
			03 : "Marzo",
			04 : "Abril",
			05 : "Mayo",
			06 : "Junio",
			07 : "Julio",
			08 : "Agosto",
			09 : "Septiembre",
			10 : "Octubre",
			11 : "Noviembre",
			12 : "Diciembre"
		},
		grid: {},
		start(){
			current_day        = new Date();
			this.today.date    = current_day.getDate();
			this.date          = current_day.getDate();
			this.today.weekday = current_day.getDay() + 1;
			this.today.month   = current_day.getMonth() + 1;
			this.today.year    = current_day.getFullYear();
			this.populateGrid(this.today.month, this.today.year);
		},
		parseDate(n){
			parsed = '';
			n.toString().length == 1 ? parsed = '0' + n.toString() : parsed =  n.toString();
			return parsed;
		},
		populateGrid( month, year){
			prev_month = {};
			next_month = {};
			aux = [];
			month == 01 ? prev_month.month = 12 : prev_month.month = month - 1;
			month == 12 ? next_month.month = 01 : next_month.month = month + 1;
			month == 01 ? prev_month.year = year -1 : prev_month.year = year;
			month == 12 ? next_month.year = year +1 : next_month.year = year;
			prev_month.days = this.daysOnMonth(prev_month.month , prev_month.year);
			next_month.days = this.daysOnMonth(next_month.month , next_month.year);
			grid= {
				month: month,
				year: year,
				days: {}
				};
			this.grid = grid;
			this.date = null;
			calendar = {
				length : 0,
				start: new Date(year.toString() + '-' + month.toString() + '-1').getDay() + 1
			};
			for ( i = 0; i < calendar.start -1   ; i++ ){
				aux[i] = prev_month.days - i;
			}
			aux.sort();
			for ( j = 0; j < aux.length; j++ ){
				calendar[j + 1] = { day: aux[j], disabled : true , today:false };
				calendar.length = calendar.length + 1;
			}
			for ( k = aux.length; k < this.daysOnMonth( current_day.month , current_day.year ) + aux.length; k++ ){
				if (month == this.today.month){
					if (k - aux.length +1 == this.today.date && year == this.today.year){
						calendar[k + 1] = { day: k - aux.length +1 , disabled: false , today: true };
					}
					else{
						if(k - aux.length +1 < this.today.date){
							calendar[k + 1] = { day: k - aux.length +1 , disabled: true , today : false };
						}
						else{
							calendar[k + 1] = { day: k - aux.length +1 , disabled : false, today: false };
						}
					}
				}
				else {
					calendar[k + 1] = { day: k - aux.length +1 , disabled : false, today: false };
				}
				calendar.length = calendar.length + 1;
			}
			counter = 0;
			for( l = calendar.length +1; l <= 35; l++ ){
				counter ++;
				calendar[l] = { day: counter, disabled: true , today : false };
				calendar.length = calendar.length + 1;
			}
			for( i = 1; i <= calendar.length; i++ ){
				grid.days[i] = calendar[i];
			}
			this.grid = grid;
		},
		setDate( date, status ){
			if (!status){
				this.date = date;
				this.stage = "form";
			}
		},
		daysOnMonth( m, y ){
			if ( m % 2 == 0 ){ if ( m == 2 ){ if ( y % 4 != 0){
						return 28;}
					return 29;}
				return 30;}
			return 31;
		},
	}
}