
import * as del from 'del';
import * as yargs from 'yargs';


export default class TaskLib {
    public LIB: Array<string>;

    constructor() {
        this.LIB = [
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js'];
    }
    public hasTag(): boolean {
        return (yargs.argv && yargs.argv.tag && yargs.argv.tag.length && yargs.argv.tag.length > 0);
    }
    public getTag(): string {
        if (this.hasTag()) {
            return yargs.argv.tag;
        } else {
            return this.timestamp();
        }
    }
    private timestamp(): string {
        let rawDate = new Date();
        let datePart = rawDate.toDateString();
        let minString: string;
        let secondString: string;
        let minutes: number = rawDate.getMinutes();
        let seconds: number = rawDate.getSeconds();
        if (minutes < 10) {
            minString = '0' + minutes;
        } else {
            minString = minutes.toString();
        }
        if (seconds < 10) {
            secondString = '0' + seconds;
        } else {
            secondString = seconds.toString();
        }
        let timePart = rawDate.getHours() + ':' + minString + ':' + secondString;

        return datePart + ' ' + timePart;
        }
}
