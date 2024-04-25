import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
@Pipe({
  name: 'highlight',
})
export class HighlightSearch implements PipeTransform {
  transform(value: any, args: any): any {
    if (args && value) {
      let startIndex = value.indexOf(args);
      if (startIndex != -1) {
        let endLength = args.length;
        let matchingString = value.substr(startIndex, endLength);
        return value.replace(
          matchingString,
          '<span style="background-color: yellow;font-weight: bold;">' +
            matchingString +
            '</span>'
        );
        // return value.replace(matchingString, '<span class="highlight">' + matchingString + "</span>");
      }
    }
    // if (!args) {
    //   return value;
    // }
    // var re = new RegExp(args, 'gi'); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
    // return value.replace(re, "<span style='background-color: yellow'>"+args+"</span>");
  }
}

@Pipe({name: 'replace'})
export class ReplacePipe implements PipeTransform {
  transform(value: string, strToReplace: string, replacementStr: string): string {

    if(!value || !strToReplace)
    {
      return value;
    }

 return value.replace(new RegExp(strToReplace, 'g'), replacementStr);
  }
}

@Pipe({
  name: 'timeStringToTime'
})
export class TimeStringToTimePipe implements PipeTransform {
  transform(timeString: string): Date {
    return new Date(`2000-01-01T${timeString}`);
  }
}